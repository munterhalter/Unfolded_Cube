AFRAME.registerComponent("position-tracking", {
  // A new instance of the component gets created for each <a-entity> the component is attached to

  // The init function gets executed each time an instance of the component is created
  init: function () {
    // The given instance of the component can be accessed using the `this` variable
    // for example: this.name refers to the string representation of the component name
    console.log(
      "Hello, " + this.name + " is being initialized on the element."
    );
    // this.el refers to the <a-entity> this component is attached to
    console.log(this.el);

    this.debug = AFRAME.utils.throttle(this.debug, 1000, this);
  },
  debug: function (t, dt) {
    // This debugging functions is NOT executed automatically
    // It gets called from the "tick" function
    // console.log("This is a debugging function");
    console.log("Current position: " + current_face);
    // Printing x, y, z values
    //console.log("x-position: " + this.el.object3D.position.x);
    //console.log("z-position: " + this.el.object3D.position.z);
  },
  tick: function (t, dt) {
    this.el.object3D.position.x;
    this.el.object3D.position.y;
    this.el.object3D.position.z;

    if (this.el.object3D.position.x < 10 && this.el.object3D.position.x > -10) {
      if (
        this.el.object3D.position.z < 10 &&
        this.el.object3D.position.z > -10
      ) {
        current_face = "FRONT";
      } else if (
        this.el.object3D.position.z < -10 &&
        this.el.object3D.position.z > -30
      ) {
        current_face = "TOP";
      } else if (
        this.el.object3D.position.z < 30 &&
        this.el.object3D.position.z > 10
      ) {
        current_face = "BOTTOM";
      }
    } else if (
      this.el.object3D.position.x < -10 &&
      this.el.object3D.position.x > -20
    ) {
      if (
        this.el.object3D.position.z < 10 &&
        this.el.object3D.position.z > -10
      ) {
        current_face = "LEFT";
      }
    } else if (
      this.el.object3D.position.x < 30 &&
      this.el.object3D.position.x > 10
    ) {
      if (
        this.el.object3D.position.z < 10 &&
        this.el.object3D.position.z > -10
      ) {
        current_face = "RIGHT";
      }
    } else if (
      this.el.object3D.position.x < 50 &&
      this.el.object3D.position.x > 30
    ) {
      if (
        this.el.object3D.position.z < 10 &&
        this.el.object3D.position.z > -10
      ) {
        current_face = "BACK";
      }
    }

    // The following code is responsible for calling the debugging function
    this.debug(t, dt);
  },
});
