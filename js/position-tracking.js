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

    this.debug = AFRAME.utils.throttle(this.debug, 1000, this);
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
        current_face = "FRONT(1)";
        break;
      case 5 < x && x < 15 && -5 < z && z < 5:
        current_face = "RIGHT(2)";
        break;
      case -5 < x && x < 5 && -15 < z && z < -5:
        current_face = "TOP(3)";
        break;
      case -15 < x && x < -5 && -5 < z && z < 5:
        current_face = "LEFT(4)";
        break;
      case -5 < x && x < 5 && 5 < z && z < 15:
        current_face = "BOTTOM(5)";
        break;
      case -5 < x && x < 5 && 15 < z && z < 25:
        current_face = "BACK(6)";
        break;
    }

    // The following code is responsible for calling the debugging function
    this.debug(["x = " + x, "z = " + z, "current_face = " + current_face]);
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
