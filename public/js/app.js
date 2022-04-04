!(function (e) {
  (e.APP = {}),
    (e.APP.Modules = {}),
    (e.APP.Resources = {}),
    (e.APP.Services = {}),
    (e.APP.Ctrls = {});
})(window),
  (function (e, t) {
    "use strict";
    var i, n, s, o;
    e.APP.Services.MenuMobile =
      ((i = {}),
      ((e = {}).init = function () {
        i.setEvent();
      }),
      (n = t.querySelector(".header-fixed .icon")),
      (s = t.querySelector(".menu-mobile")),
      t.querySelector(".menu-mobile .icon"),
      (o = t.querySelector(".menu-mobile .items")),
      (i.setEvent = function () {
        n.addEventListener(
          "click",
          function () {
            s.classList.add("-active"),
              setTimeout(function () {
                o.classList.add("-active");
              }, 300);
          },
          !1
        ),
          s.addEventListener(
            "click",
            function (e) {
              i.removeClass();
            },
            !1
          ),
          s.addEventListener(
            "click",
            function (e) {
              if (e.target.classList.contains("icon")) return i.removeClass();
              e.stopPropagation();
            },
            !0
          );
      }),
      (i.removeClass = function () {
        o.classList.remove("-active"),
          setTimeout(function () {
            s.classList.remove("-active");
          }, 300);
      }),
      e);
  })(window, document),
  (function (e, t) {
    "use strict";
    var i;
    e.APP.Services.ToggleMenuUser =
      ((i = {}),
      ((e = {}).init = function () {
        i.setEvent();
      }),
      (i.aside = t.querySelector(".sidebar")),
      (i.btn = t.querySelector(".sidebar > .btn")),
      (i.setEvent = function () {
        i.btn.addEventListener(
          "click",
          function () {
            if (i.aside.classList.contains("active"))
              return (
                i.aside.classList.remove("active"),
                i.aside.removeAttribute("style")
              );
            var e = 0,
              e =
                (e += t
                  .querySelector(".sidebar-nav")
                  .getBoundingClientRect().height) +
                i.btn.getBoundingClientRect().height;
            i.aside.classList.add("active"), (i.aside.style.height = e + "px");
          },
          !1
        );
      }),
      e);
  })(window, document),
  (function (e) {
    "use strict";
    e.APP.Ctrls.Common = {
      init: function () {
        APP.Services.MenuMobile.init();
      },
    };
  })(window, document),
  (function (e) {
    "use strict";
    e.APP.Ctrls.User = {
      init: function () {
        APP.Services.ToggleMenuUser.init();
      },
    };
  })(window, document),
  (function (t) {
    "use strict";
    var e;
    (e = {
      loadCtrls: function () {
        var i = ["Common"],
          e = t.body;
        e.hasAttribute("data-js") &&
          e
            .getAttribute("data-js")
            .split(" ")
            .map(function (e, t) {
              i.push(e);
            }),
          i.forEach(function (e) {
            if (void 0 !== APP.Ctrls[e]) return APP.Ctrls[e].init();
          });
      },
    }),
      {
        init: function () {
          e.loadCtrls();
        },
      }.init();
  })((window, document));
