AFRAME.registerComponent("position-tracking", {
  // A new instance of the component gets created for each <a-entity> the component is attached to
  // The given instance of the component can be accessed using the `this` variable
  // - this.name refers to the string representation of the component name
 
  init: function () {
    // The init function gets executed each time an instance of the component is created
    
    console.log( "The component"+ this.name + " is being initialized on the element");
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

  
    if (x < 10/2 && x > -10/2) {
      if (
        z < 10/2 &&
        z > -10/2
      ) {
        current_face = "FRONT";
      } else if (
        z < -10/2 &&
        z > -30/2
      ) {
        current_face = "TOP";
      } else if (
        z < 30/2 &&
        z > 10/2
      ) {
        current_face = "BOTTOM";
      }
    } else if (
      x < -10/2 &&
      x > -20/2
    ) {
      if (
        z < 10/2 &&
        z > -10/2
      ) {
        current_face = "LEFT";
      }
    } else if (
      x < 30/2 &&
      x > 10/2
    ) {
      if (
        z < 10/2 &&
        z > -10/2
      ) {
        current_face = "RIGHT";
      }
    } else if (
      x < 50 &&
      x > 30/2
    ) {
      if (
        z < 10/2 &&
        z > -10/2
      ) {
        current_face = "BACK";
      }
    }

    // The following code is responsible for calling the debugging function
    this.debug(t, dt);
  },

  debug: function (t, dt) {
    // This debugging functions is NOT executed automatically
    // It gets called from the "tick" function
    // console.log("This is a debugging function");
    console.log("Current position: " + current_face);
   
  },
  
});
