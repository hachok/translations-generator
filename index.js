#!/usr/bin/env node
!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var s = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var s in e)
          n.d(
            r,
            s,
            function (t) {
              return e[t];
            }.bind(null, s),
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function (e, t, n) {
    'use strict';
    var r =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    Object.defineProperty(t, '__esModule', { value: !0 });
    var s,
      o,
      i,
      a = r(n(1)),
      l = r(n(2)),
      u = r(n(6)),
      f = n(7),
      c = n(3),
      d = n(4),
      p = r(n(5)),
      y = { ext: d.Extensions.js, path: 'translations' };
    try {
      s = a.default.readFileSync('translations.config.json', 'utf8');
    } catch (e) {
      console.log(l.default.yellow(p.default.errors.config));
    }
    s && (y = Object.assign(y, JSON.parse(s)));
    var g = a.default.readdirSync(y.path);
    g.length || (console.log(l.default.red(p.default.errors.translations)), process.exit(1)),
      (i = u.default
        .question(l.default.white(p.default.questions.translations), c.emptyFn)
        .replace(/\s/g, '')
        .split(',')),
      y.alias &&
        (i = i.map(function (e) {
          return y.alias[e];
        })),
      (o = u.default.question(l.default.white(p.default.questions.label), c.emptyFn)) ||
        (console.log(l.default.red(p.default.errors.label)), process.exit(1));
    var v = u.default.question(l.default.white(p.default.questions.text), c.emptyFn);
    (t.isOverwrites = function (e, n) {
      return (
        !e[o] ||
        (u.default.question(l.default.yellow(p.default.warnings.overwrites(o, n)), c.emptyFn)
          ? ((o = u.default.question(l.default.white(), c.emptyFn)), t.isOverwrites(e, n))
          : void 0)
      );
    }),
      f.writeTranslations(g, i, y, o, v);
  },
  function (e, t) {
    e.exports = require('fs');
  },
  function (e, t) {
    e.exports = require('chalk');
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.emptyFn = function () {}),
      (t.checkTranslations = function (e, t, n) {
        return e.includes(t) || e.includes(t.replace(n.pattern, ''));
      }),
      (t.getFilename = function (e) {
        return e.replace(/.js|.ts|.json/, '');
      }),
      (t.parseFile = function (e) {
        return JSON.parse(
          e
            .toString()
            .replace('export default ', '')
            .replace(';', '')
            .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":')
            .replace(/,(?!\s*?[{\["'\w])/g, ''),
        );
      }),
      (t.generateFileBasedOnJson = function (e) {
        return (
          'export default ' +
          JSON.stringify(e, null, 2).replace(/("|\w)(?=\s*?[}\]])/g, '$1,') +
          ';'
        );
      });
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (function (e) {
        (e.js = 'js'), (e.json = 'json');
      })(t.Extensions || (t.Extensions = {}));
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = {
        errors: {
          config:
            'Error: No config file provided. Please, make sure that translations.config.json is in root directory',
          translations: 'Error: No translations found in such directory',
          label: 'Error: The label field is required',
        },
        questions: {
          translations: 'Enter translations you want to use: (leave it empty if for all of them) ',
          label: 'Enter a label:\n',
          text: 'Enter a text:\n',
          newLabel: 'Enter a new label:\n',
        },
        warnings: {
          overwrites: function (e, t) {
            return (
              'Warning: ' + e + ' already exists for ' + t + '. Do you want to overwrite it?(y/n)\n'
            );
          },
        },
        success: {
          translations: function (e, t) {
            return 'The translation ' + e + ' was generated to ' + t + ' successfully!';
          },
        },
      });
  },
  function (e, t) {
    e.exports = require('readline-sync');
  },
  function (e, t, n) {
    'use strict';
    var r =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    Object.defineProperty(t, '__esModule', { value: !0 });
    var s = r(n(1)),
      o = r(n(2)),
      i = n(3),
      a = n(0),
      l = n(4),
      u = r(n(5));
    t.writeTranslations = function (e, t, n, r, f) {
      for (var c = 0; c < e.length; c++) {
        var d = e[c],
          p = i.getFilename(d),
          y = n.path + '/' + d;
        if (!t.length || i.checkTranslations(t, p, n)) {
          if (n.ext === l.Extensions.js) {
            var g = s.default.readFileSync(y),
              v = i.parseFile(g);
            a.isOverwrites(v, p) && (v[r] = f),
              s.default.writeFileSync(y, i.generateFileBasedOnJson(v));
          }
          if (n.ext === l.Extensions.json) {
            (g = s.default.readFileSync(y, 'utf8')), (v = JSON.parse(g));
            a.isOverwrites(v, p) && (v[r] = f),
              s.default.writeFileSync(y, JSON.stringify(v, null, 2));
          }
          console.log(o.default.green(u.default.success.translations(r, p)));
        }
      }
    };
  },
]);
