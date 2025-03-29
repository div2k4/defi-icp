import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor LendingBorrowing {
  // Types
  type UserProfile = {
    principal: Principal;
    deposits: Float;
    borrows: Float;
    collateral: Float;
  };

  type Transaction = {
    user: Principal;
    amount: Float;
    transactionType: Text; // "deposit", "withdraw", "borrow", "repay"
    timestamp: Time.Time;
  };

  // Constants
  let LIQUIDATION_THRESHOLD : Float = 1.5; // 150% LTV
  let INTEREST_RATE : Float = 0.05; // 5% APR

  // State variables
  private stable var totalValueLocked : Float = 0.0;
  private stable var totalBorrowed : Float = 0.0;
  private var users = HashMap.HashMap<Principal, UserProfile>(0, Principal.equal, Principal.hash);
  private var transactions = Array.init<Transaction>(0, {
    user = Principal.fromText("aaaaa-aa");
    amount = 0.0;
    transactionType = "";
    timestamp = Time.now();
  });

  // Helper functions
  private func getLTV(user: Principal) : Float {
    let profile = users.get(user);
    switch (profile) {
      case (?p) {
        if (p.collateral == 0.0) { return 0.0; };
        return p.borrows / p.collateral;
      };
      case null { return 0.0; };
    };
  };

  private func checkLiquidation(user: Principal) : Bool {
    let ltv = getLTV(user);
    return ltv > LIQUIDATION_THRESHOLD;
  };

  // Public functions
  public shared(msg) func deposit(amount: Float) : async Result.Result<(), Text> {
    let caller = msg.caller;
    if (amount <= 0.0) { return #err("Invalid amount"); };

    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null {
        {
          principal = caller;
          deposits = 0.0;
          borrows = 0.0;
          collateral = 0.0;
        }
      };
    };

    let newProfile = {
      principal = profile.principal;
      deposits = profile.deposits + amount;
      borrows = profile.borrows;
      collateral = profile.collateral;
    };

    users.put(caller, newProfile);
    totalValueLocked += amount;

    #ok(())
  };

  public shared(msg) func withdraw(amount: Float) : async Result.Result<(), Text> {
    let caller = msg.caller;
    if (amount <= 0.0) { return #err("Invalid amount"); };

    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null { return #err("User not found"); };
    };

    if (profile.deposits < amount) { return #err("Insufficient balance"); };

    let newProfile = {
      principal = profile.principal;
      deposits = profile.deposits - amount;
      borrows = profile.borrows;
      collateral = profile.collateral;
    };

    users.put(caller, newProfile);
    totalValueLocked -= amount;

    #ok(())
  };

  public shared(msg) func borrow(amount: Float, collateralAmount: Float) : async Result.Result<(), Text> {
    let caller = msg.caller;
    if (amount <= 0.0 || collateralAmount <= 0.0) { return #err("Invalid amount"); };

    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null {
        {
          principal = caller;
          deposits = 0.0;
          borrows = 0.0;
          collateral = 0.0;
        }
      };
    };

    // Check if collateral is sufficient (LTV <= 150%)
    if (amount > collateralAmount * LIQUIDATION_THRESHOLD) {
      return #err("Insufficient collateral");
    };

    let newProfile = {
      principal = profile.principal;
      deposits = profile.deposits;
      borrows = profile.borrows + amount;
      collateral = profile.collateral + collateralAmount;
    };

    users.put(caller, newProfile);
    totalBorrowed += amount;

    #ok(())
  };

  public shared(msg) func repay(amount: Float) : async Result.Result<(), Text> {
    let caller = msg.caller;
    if (amount <= 0.0) { return #err("Invalid amount"); };

    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null { return #err("User not found"); };
    };

    if (profile.borrows < amount) { return #err("Repayment amount exceeds debt"); };

    let newProfile = {
      principal = profile.principal;
      deposits = profile.deposits;
      borrows = profile.borrows - amount;
      collateral = profile.collateral;
    };

    users.put(caller, newProfile);
    totalBorrowed -= amount;

    #ok(())
  };

  // Query functions
  public query func getTVL() : async Float {
    totalValueLocked
  };

  public query func getTotalBorrowed() : async Float {
    totalBorrowed
  };

  public query func getUserProfile(user: Principal) : async ?UserProfile {
    users.get(user)
  };

  public query func getActiveLoans() : async Nat {
    var count = 0;
    for ((_, profile) in users.entries()) {
      if (profile.borrows > 0.0) { count += 1; };
    };
    count
  };
}