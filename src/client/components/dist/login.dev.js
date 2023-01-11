"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  template: "<div class=\"center\" id=\"center\">\n    <h1 style=\"font-size:30px; margin-top:15px;\">The Daily Traveler</h1>\n    <form>\n\n    <div class=\"txt_field\">\n            <input v-model=\"user.userName\" type=\"text\" required style=\"text-align: center;\" id = \"myusername\" name = \"myusername\" placeholder=\"Username\">\n            <span></span>\n            \n    </div>\n    <div class=\"txt_field\">\n            <input v-model=\"user.password\" type=\"password\" required style=\"text-align: center;\" id = \"mypassword\" name = \"password\"  placeholder=\"Password\">\n            <span></span>\n           \n    </div>\n\n    <input type=\"button\" value=\"Login\" style=\"margin-bottom: -200px;\" @click=\"login\">\n    <div class=\"signup_link\">\n    <input type=\"button\" value=\"Sign up\" style=\"background: red; margin-bottom: -200px;\" onclick=\"location.href='/signUp'\">\n\n    </div>\n    </form>\n    </div>\n\t  ",
  data: function data() {
    return {
      user: {},
      response: null
    };
  },
  mounted: function mounted() {
    return regeneratorRuntime.async(function mounted$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  methods: {
    login: function login() {
      var reqData;
      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              reqData = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.user)
              };
              _context2.next = 3;
              return regeneratorRuntime.awrap(fetch('api/users/login', reqData).then(function (response) {
                return response.json();
              }));

            case 3:
              this.response = _context2.sent;
              console.log(this.response);

              if (this.response.includes('success')) {
                alert(this.response);
                window.location.href = '/';
              } else //alert((this.response).toString());
                alert(this.response);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }
};
exports["default"] = _default;