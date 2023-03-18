AFRAME.registerComponent("position-tracking", {
  // A new instance of the component gets created for each <a-entity> the component is attached to
  // The given instance of the component can be accessed using the `this` variable
  // - this.name refers to the string representation of the component name

  init: function () {
    // The init function gets executed each time an instance of the component is created

    console.log(
      "The component" + this.name + " is being initialized on the element"
    );
    console.log(this.el); // this.el is the <a-entity> this component is attached to

    // BUG!: You use currentFace in your tick function but this makes it a local variable to that function
    // BUG!: this way, currentFace cannot be accessed from outside
    // BUG!: also, all variables local to a function should be declared using let or const
    // BUG!: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
    // BUG!: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
    // BUG!: here we decide to make the currentFace part of the component
    this.currentFace="UNKNOWN";

    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
  },

  tick: function (t, dt) {
    // SUGGESTION: if inside of a function, you are accessing the same variable many times it is better to give it a name
    // SUGGESTION: This makes the code more readable and optimizes performane (even though by very little).
    // SUGGESTION: Essentially every object attribute access (every . in below) has a small performance cost
    // SUGGESTION: This way you access the chain of nested objects only once.
    let x = this.el.object3D.position.x;
    let y = this.el.object3D.position.y;
    let z = this.el.object3D.position.z;

    // SUGGESTION: using a "trivial" case statement makes code more readable instead of nested ifs
    // SUGGESTION: nested ifs are generally hard to understand even though they are logically correct
    // SUGGESTION: See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
    // SUGGESTION: Normally, switch compares the value of the "switch" to the cases
    // SUGGESTION: Here it compares the value of "true" to the logical expressions below.
    switch (true) {
      case -5 < x && x < 5 && -5 < z && z < 5:
        this.currentFace = "FRONT(1)";
        break;
      case 5 < x && x < 15 && -5 < z && z < 5:
        this.currentFace = "RIGHT(2)";
        break;
      case -5 < x && x < 5 && -15 < z && z < -5:
        this.currentFace = "TOP(3)";
        break;
      case -15 < x && x < -5 && -5 < z && z < 5:
        this.currentFace = "LEFT(4)";
        break;
      case -5 < x && x < 5 && 5 < z && z < 15:
        this.currentFace = "BOTTOM(5)";
        break;
      case -5 < x && x < 5 && 15 < z && z < 25:
        this.currentFace = "BACK(6)";
        break;
    }

    // The following code is responsible for calling the debugging function
    this.throttledDebug(["x = " + x, "z = " + z, "currentFace = " + this.currentFace]);
  },

  /**
   * This is a debugging function
   * It is NOT executed automatically
   * All it does is console.log each element of the array given to it as input
   * If `what` is not an array just console.log `what`
   * @param {Array<any>} what - what to print to the console log
   * @returns {undefined}
   */
  debug: function (what) {
    if (!Array.isArray(what)) {
      console.log(what);
    } else {
      for (msg of what) {
        console.log(msg);
      }
    }
  },
});
