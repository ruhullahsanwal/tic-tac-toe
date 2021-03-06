! function(e, t, r, o, n, s, a) {
    e.GoogleAnalyticsObject = n, e[n] = e[n] || function() {
        (e[n].q = e[n].q || []).push(arguments)
    }, e[n].l = 1 * new Date, s = t.createElement(r), a = t.getElementsByTagName(r)[0], s.async = 1, s.src = "https://www.google-analytics.com/analytics.js", a.parentNode.insertBefore(s, a)
}(window, document, "script", 0, "ga"), ga("create", "UA-106862085-1", "auto"), ga("send", "pageview"), window.onerror = function(e, t, r) {
        return e && ga("send", "event", "Error", e, t && r ? "[" + t + ":" + r + "]" : "", !0), !1
    },
    function() {
        function e(e) {
            var t = new XMLHttpRequest;
            t.open("GET", "assets/audio/" + e + ".wav", !0), t.responseType = "arraybuffer", t.onload = function() {
                p.decodeAudioData(t.response, function(t) {
                    T[e] = t
                }, function() {})
            }, t.send()
        }

        function t(e) {
            if (!m && T[e]) {
                var t = p.createBufferSource();
                t.buffer = T[e], t.connect(p.destination), t.start ? t.start(0) : t.noteOn(0)
            }
        }

        function r() {
            for (var e = g.mute.querySelectorAll("path"), t = e.length; t--;) e[t].style.display = m ? "none" : ""
        }

        function o() {
            if (m = !m, y) try {
                localStorage.setItem("muted", m.toString())
            } catch (e) {}
            r(), ga("send", "event", "Mute", m ? "muted" : "unmuted")
        }

        function n() {
            A = !A;
            var e = g.scores.scores.classList;
            A ? (e.remove("p1"), e.add("p2"), k = !0) : (e.remove("p2"), e.add("p1"), k = !1), ga("send", "event", "Mode", A ? "players" : "computer"), g.scores.player1.innerHTML = A ? q.player1 : h.player1, g.scores.player2.innerHTML = A ? q.player2 : h.player2, g.scores.ties.innerHTML = A ? q.ties : h.ties, v = !1, i()
        }

        function s(e, t) {
            g.squares[t].querySelector("div").classList.add(e)
        }

        function a() {
            var e = g.scores.turn1.classList,
                t = g.scores.turn2.classList,
                r = g.scores.turnTies.classList;
            A && "none" === g.restart.style.display ? (M ? (t.remove("turn"), e.add("turn")) : (e.remove("turn"), t.add("turn")), r.add("turn")) : (e.remove("turn"), t.remove("turn"), r.remove("turn"))
        }

        function c(e) {
            0 !== w[e] || d() || !A && M || (A ? (M = !M, w[e] = M ? -1 : 1, s(M ? S : L, e), t("note-" + (M ? "low" : "high")), d()) : (w[e] = -1, s(S, e), M = !0, t("note-low"), setTimeout(f, D)), a())
        }

        function u(e) {
            g.squares[e].onmousedown = function(t) {
                t.preventDefault(), c(e)
            }, g.squares[e].ontouchstart = function(t) {
                t.preventDefault(), s(S, e)
            }, g.squares[e].ontouchend = function(t) {
                if (t.preventDefault(), T["note-low"])
                    for (var r = b; r--;) {
                        var o = g.squares[r];
                        o.ontouchstart = o.onmousedown, o.ontouchend = void 0
                    }
                c(e)
            }
        }

        function i() {
            if (!v) {
                v = !0, g.restart.style.display = "none", w = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var e = b; e--;) g.squares[e].querySelector("div").className = "";
                g.scores.ties.classList.remove("appear"), g.scores.player1.classList.remove("appear"), g.scores.player2.classList.remove("appear"), g.board.classList.remove("blink"), M = k = !k, a(), k && !A && setTimeout(f, D)
            }
        }

        function l(e, r) {
            g.restart.style.display = "block", setTimeout(function() {
                var o = A ? "players " : "computer ";
                if (setTimeout(function() {
                        v = !1
                    }, D), r)
                    for (var n = 3; n--;) g.squares[r[n]].querySelector("div").classList.add("blink");
                switch (e) {
                    case S:
                        g.scores.player1.innerHTML = A ? ++q.player1 : ++h.player1, g.scores.player1.classList.add("appear"), t("game-over"), ga("send", "event", "Game", o + (A ? S : "lose"));
                        break;
                    case L:
                        g.scores.player2.innerHTML = A ? ++q.player2 : ++h.player2, g.scores.player2.classList.add("appear"), t("game-over"), ga("send", "event", "Game", o + (A ? L : "win"));
                        break;
                    default:
                        g.scores.ties.innerHTML = A ? ++q.ties : ++h.ties, g.scores.ties.classList.add("appear"), g.board.classList.add("blink"), t("game-over-tie"), ga("send", "event", "Game", o + "tie")
                }
            }, M && !A ? 100 : D + 100)
        }

        function d() {
            for (var e = x.length; e--;) {
                var t = x[e],
                    r = w[t[0]] + w[t[1]] + w[t[2]];
                if (3 === r || -3 === r) return l(3 === r ? L : S, t), !0
            }
            var o = 0;
            for (e = b; e--;) 0 !== w[e] && o++;
            return 9 === o && (l(), !0)
        }

        function f() {
            if (!d()) {
                var e, r, o, n, c, u, i = 0;
                for (M = !1, a(), t("note-high"), e = b; e--;) 0 !== w[e] && 1 === ++i && (u = e);
                if (i < 2 && Math.random() > .2)
                    do {
                        c = Math.floor(Math.random() * b)
                    } while (c === u);
                else
                    for (e = b; e--;) {
                        for (r = b; r--;)
                            if (0 === w[r]) {
                                if (w[r] = 1, d()) return void s(L, r);
                                w[r] = 0
                            }
                        if (0 === w[e]) {
                            w[e] = 1;
                            var l = null,
                                f = w.concat();
                            for (r = b; r--;)
                                if (0 === f[r]) {
                                    for (f[r] = -1, o = x.length; o--;)
                                        if (f[x[o][0]] + f[x[o][1]] + f[x[o][2]] === -3 && Math.random() > H) return w[e] = 0, w[r] = 1, s(L, r), void d();
                                    var p = 0,
                                        y = 0,
                                        m = f.concat(),
                                        v = f.concat();
                                    for (o = b; o--;) 0 === m[o] && (m[o] = 1), 0 === v[o] && (v[o] = -1);
                                    for (o = x.length; o--;) m[x[o][0]] + m[x[o][1]] + m[x[o][2]] === 3 && p++, v[x[o][0]] + v[x[o][1]] + v[x[o][2]] === -3 && y++;
                                    var g = p - y;
                                    l = null == l ? g : l > g ? g : l, f[r] = 0
                                }(null == n || n < l) && (n = l, c = e), w[e] = 0
                        }
                    }
                w[c] = 1, s(L, c), d()
            }
        }
        var p, y, m, v, w, g = {
                board: document.querySelector(".board"),
                squares: document.querySelectorAll(".square"),
                restart: document.querySelector(".restart"),
                mute: document.querySelector(".mute"),
                scores: {
                    scores: document.querySelector(".scores"),
                    swap: document.querySelector(".swap"),
                    player1: document.querySelector(".player1 .score"),
                    player2: document.querySelector(".player2 .score"),
                    ties: document.querySelector(".ties .score"),
                    turn1: document.querySelector(".player1"),
                    turn2: document.querySelector(".player2"),
                    turnTies: document.querySelector(".ties")
                }
            },
            h = {
                player1: 0,
                player2: 0,
                ties: 0
            },
            q = {
                player1: 0,
                player2: 0,
                ties: 0
            },
            S = "x",
            L = "o",
            T = {},
            b = 9,
            M = !0,
            k = !0,
            A = !1,
            D = 300,
            H = .75,
            x = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
        ! function() {
            try {
                y = "localStorage" in window && null !== window.localStorage
            } catch (e) {
                y = !1
            }
            if (window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext) {
                if (p = new AudioContext, e("note-high"), e("note-low"), e("game-over"), e("game-over-tie"), y) try {
                    m = "true" === localStorage.getItem("muted")
                } catch (e) {
                    m = !1
                }
                r(), g.mute.ontouchstart = g.mute.onclick = function(e) {
                    e.preventDefault(), o()
                }
            } else g.mute.style.display = "none";
            for (var t = b; t--;) u(t);
            g.restart.ontouchstart = g.scores.scores.ontouchstart = function(e) {
                e.preventDefault()
            }, g.scores.scores.ontouchend = g.scores.scores.onclick = function(e) {
                e.preventDefault(), n()
            }, g.restart.ontouchend = g.restart.onclick = function(e) {
                e.preventDefault(), i()
            }
        }(), i()
    }();