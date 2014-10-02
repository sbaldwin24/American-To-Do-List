
    (function() {
    window.getUserCredits = function(b) {
        return $.ajax({
            url: "https://bingo.auth0.com/api/users" + b + "&host=http://sterlingbaldwin.com/American-To-Do-List/",
            dataType: "json",
            success: function(c) {
                return main.o.saveLogin(c);
            }
        });
    };
    $.fn.fadeOutWithDelay = function(c) {
        var b;
        b = this;
        return setTimeout((function() {
            return b.fadeOut(400);
        }), c);
    };
    window.main = {
        m: {
            debug: {},
            settings: {
                console: $("div#console"),
                $notification: $("div#notification_wrap"),
                $todos_wrapper: $("div#todos_wrapper"),
                $login: $("div#login"),
                $new_item: $("input#new_item"),
                $body: $("body"),
                $title: $("title"),
                $log_out: $("div#log_out"),
                $about: $("div#about"),
                $login_avator: $("div#login_ava"),
                $auth0: $("div#login0"),
                $todos_wrapper: $("div#todos_wrapper")
            },
            state: {
                user_id: 0,
                newTodoSubmitting: false
            },
            fetchPosts: function() {
                main.makeProfile("fetchPost", "Collapsed");
                return main.makeProfileEnd("fetchPost", "Collapsed");
            }
        },
        o: {
            init: function() {
                var b, c = this;
                main.makeProfile("init");
                main.e.listen();
                main.v.backbone();
                main.o.helpers();
                main.m.settings.$body.tipPop();
                b = this.getCookie();
                if (b != null) {
                    this.getUserDb(b).done(function(d) {
                        c.showLogin(d);
                        main.m.state.user_id = d.user_id;
                        c.getTodos(b.user_id);
                        return c.saveCookie(d.user_id);
                    }).fail(function(d) {});
                    main.m.settings.$log_out.fadeIn();
                } else {
                    this.getTodos(0);
                    main.v.showNoty({
                        text: "What is it? Click me",
                        type: "ok",
                        hide: 12000,
                        callback: (function() {
                            return main.m.settings.$about.fadeIn();
                        })
                    });
                    main.m.settings.$login.fadeIn();
                }
                setInterval((function() {
                    if (main.m.state.user_id === 0) {
                        return todoListView.refresh();
                    } else {
                        return main.o.getTodos(main.m.state.user_id);
                    }
                }), 1000 * 60 * 3);
                return main.makeProfileEnd("init");
            },
            setInputSubmitted: function(b) {
                main.m.state.newTodoSubmitting = b;
                return main.m.settings.$new_item.toggleClass("progress progress-striped active");
            },
            randomQuote: function() {
                var b;
                b = ["Live Free or Die!", "Country First!", "Life, Liberty and the Pursuit of Happiness...", "You and I have a rendezvous with destiny.", "Barack Obama === Jimmy Carter", "The Union and Constitution Forever", "America = #1", "BELEIVE IN AMERICA", "Government is the problem", "Mr. Gorbachev, tear down this wall!", "Trust, but verify.", "Government's first duty is to protect the people, not run their lives.", "Peace through strength.", "AMERICA === the Hope of the Earth, the Shining City on a Hill.", "A people free to choose will always choose peace.", "A hippie is someone who looks like Tarzan, walks like Jane and smells like Cheetah.", "There you go again.", "As government expands, liberty contracts.", "AUH20", "Man is not free unless government is limited. ", "I am in favor of cutting taxes under any circumstances and for any excuse.", "Free market as a means of creating political and social freedom.", "Capitalism is my religion.", "Bill Clinton enjoyed the effects of Reaganomics.", "There is no such thing as a free lunch.", "Nothing is so permanent as a temporary government program.", "Reduce taxes and regulation.", "USA! USA! USA!", "You are what you do, not what you say you'll do.", "ABOLISH THE FEDERAL RESERVE", "Audit the Fed.", "Repeal Obamacare", "America made by those who do."];
                return b[Math.floor(Math.random() * b.length)];
            },
            helpers: function() {
                Date.prototype.getWeek = function() {
                    var f, e, b, c, d;
                    e = this.getMonth();
                    f = new Date(this.getFullYear(), e, 1).getDay();
                    b = this.getDate() + f - 1;
                    c = 1 + Math.floor(b / 7);
                    d = 7 * 24 * 60 * 60 * 1000;
                    if (c === 4) {
                        return c + (e !== new Date(this.getTime() + d).getMonth());
                    } else {
                        return c;
                    }
                };
                return Date.prototype.elapsed = function() {
                    var d, c, f, g, e, b;
                    f = {
                        year: this.getFullYear(),
                        month: this.getMonth(),
                        day: this.getDay(),
                        week: this.getWeek(),
                        hour: this.getHours(),
                        minute: this.getMinutes(),
                        second: this.getSeconds()
                    };
                    c = new Date();
                    c = {
                        year: c.getFullYear(),
                        month: c.getMonth(),
                        day: c.getDay(),
                        week: c.getWeek(),
                        hour: c.getHours(),
                        minute: c.getMinutes(),
                        second: c.getSeconds()
                    };
                    g = function(i, h) {
                        if (i === 1) {
                            return "";
                        } else {
                            if (h === "month") {
                                return "es";
                            } else {
                                return "s";
                            }
                        }
                    };
                    e = function() {
                        var h, j, i;
                        d++;
                        i = c[b[d].name] - f[b[d].name];
                        if (i < 0) {
                            i = b[d][b[d].name] + i;
                        }
                        if (b[d].name === "second") {
                            if (i < 10) {
                                return "just now";
                            } else {
                                return "" + i + " " + b[d].name + (g(i, b[d].name)) + " ago";
                            }
                        }
                        if (i !== 0) {
                            j = c[b[d + 1].name] - f[b[d + 1].name];
                            h = "";
                            if (j < 0) {
                                j = b[d + 1][b[d + 1].name] + j;
                                if (--i === 0) {
                                    return e();
                                }
                            }
                            if (j !== 0) {
                                h = ", " + j + " " + b[d + 1].name + (g(j, b[d + 1].name));
                            }
                            return ("" + i + " " + b[d].name + (g(i, b[d].name))) + h + " ago";
                        } else {
                            return e();
                        }
                    };
                    d = -1;
                    b = [{
                        name: "year",
                        year: 1
                    }, {
                        name: "month",
                        month: 12
                    }, {
                        name: "week",
                        week: 4
                    }, {
                        name: "day",
                        day: 7
                    }, {
                        name: "hour",
                        hour: 24
                    }, {
                        name: "minute",
                        minute: 60
                    }, {
                        name: "second",
                        second: 60
                    }];
                    return e();
                };
            }
        },
        v: {
            console: function(b, c) {
                return main.m.settings.console.prepend('<p class="' + (c || "ok") + '">' + b + "<p>");
            },
            backbone: function() {
                var b, e, f, g, d, c;
                b = Backbone.Model.extend({});
                c = new b;
                e = Backbone.View.extend({
                    tagName: "li",
                    id: "item",
                    events: {
                        "click input#made": "toggleMade",
                        "click span": "toggleMade",
                        "click a": "removeModel"
                    },
                    initialize: function() {},
                    remove: function() {
                        return this.$el.remove();
                    },
                    render: function() {
                        var h, i;
                        if (this.model.get("date") != null) {
                            h = this.model.get("date");
                            h = h.substring(0, h.length - 16);
                        }
                        if (this.model.get("text") != null) {
                            i = this.model.get("text");
                            i = i.replace("\\'", "'");
                            i = i.replace('\\"', '"');
                        }
                        this.$el.html('<input id="made" type="checkbox" ' + (this.model.get("made") === "true" ? "checked" : "") + ' />           <span class=" ' + (this.model.get("made") === "true" ? "made" : "") + '">             ' + i + "</span>            <a href='#'></a>            <span id=\"date\">" + (new Date(this.model.get("date")).elapsed()) + '</span><div title="' + h + '" id="clock" ></div>');
                        return this.$el.fadeIn();
                    },
                    removeModel: function(h) {
                        var i = this;
                        h.preventDefault();
                        this.$el.remove();
                        if (main.m.state.user_id === 0) {
                            todoList.remove(this.model);
                            return todoListView.setCount();
                        } else {
                            return this.removeModelDb().done(function(j) {
                                return main.o.getTodos(main.m.state.user_id);
                            });
                        }
                    },
                    removeModelDb: function() {
                        var h, i, j;
                        h = this.model.toJSON();
                        h["delete"] = "true";
                        i = $.Deferred();
                        j = $.ajax({
                            url: "https://bingo.auth0.com/oauth/token",
                            data: h,
                            type: "post",
                            success: function(k) {
                                return i.resolve(k);
                            },
                            error: function(k) {
                                return i.reject(k);
                            }
                        });
                        return i.promise();
                    },
                    toggleMade: function(h) {
                        var i = this;
                        if (this.model.get("made") === "false") {
                            this.model.set({
                                made: "true"
                            });
                        } else {
                            this.model.set({
                                made: "false"
                            });
                        }
                        todoList.sort();
                        if (main.m.state.user_id === 0) {
                            return Tinycon.setBubble(todoListView.favText());
                        } else {
                            return this.save().done(function(j) {
                                return Tinycon.setBubble(todoListView.favText());
                            }).fail(function(j) {});
                        }
                    },
                    save: function() {
                        var h, i;
                        h = $.Deferred();
                        i = $.ajax({
                            url: "https://bingo.auth0.com/oauth/token",
                            data: this.model.toJSON(),
                            type: "post",
                            success: function(j) {
                                return h.resolve(j);
                            },
                            error: function(j) {
                                return h.reject(j);
                            }
                        });
                        return h.promise();
                    },
                    addOneDb: function(j) {
                        var h, i;
                        if (j == null) {
                            j = "";
                        }
                        h = $.Deferred();
                        i = $.ajax({
                            url: "https://bingo.auth0.com/oauth/token",
                            data: {
                                add: true,
                                text: j,
                                date: new Date(),
                                author: main.m.state.user_id
                            },
                            type: "post",
                            success: function(k) {
                                return h.resolve(k);
                            },
                            error: function(k) {
                                return h.reject(k);
                            }
                        });
                        return h.promise();
                    },
                    clear: function() {
                        var h, i;
                        h = $.Deferred();
                        i = $.ajax({
                            url: "https://bingo.auth0.com/oauth/token",
                            data: {
                                clear: true,
                                user_id: main.m.state.user_id
                            },
                            type: "post",
                            success: function(j) {
                                return h.resolve(j);
                            },
                            error: function(j) {
                                return h.reject(j);
                            }
                        });
                        return h.promise();
                    },
                    clear_all: function() {
                        var h, i;
                        h = $.Deferred();
                        i = $.ajax({
                            url: "https://bingo.auth0.com/oauth/token",
                            data: {
                                clear_all: true,
                                user_id: main.m.state.user_id
                            },
                            type: "post",
                            success: function(j) {
                                return h.resolve(j);
                            },
                            error: function(j) {
                                return h.reject(j);
                            }
                        });
                        return h.promise();
                    }
                });
                d = new e({
                    model: c
                });
                f = Backbone.Collection.extend({
                    url: "https://bingo.auth0.com/oauth/token",
                    initialize: function() {},
                    removeModel: function(h) {
                        return todoList.remove(h);
                    }
                });
                parent.todoList = new f({
                    model: c
                });
                todoList.reset();
                todoList.on("reset", function() {
                    return todoListView.refresh();
                });
                g = Backbone.View.extend({
                    tagName: "ul",
                    id: "todo",
                    initialize: function() {
                        var h = this;
                        this.collection.on("add", this.addOne, this);
                        this.collection.on("remove", function() {
                            todoListView.refresh();
                            return todoListView.setCount();
                        });
                        return this.collection.on("reset", function() {
                            return h.refresh();
                        });
                    },
                    setCount: function() {
                        main.m.settings.$title.text("to do: " + (todoListView.favText()) + " items");
                        return Tinycon.setBubble(todoListView.favText());
                    },
                    render: function() {
                        if (this.collection.length > 0) {
                            return this.collection.forEach(this.addOne, this);
                        }
                    },
                    addOne: function(h) {
                        if (h.get("text") != null) {
                            d = new e({
                                model: h
                            });
                            d.render();
                            this.$el.append(d.el);
                            return todoListView.setCount();
                        }
                    },
                    refresh: function() {
                        main.m.settings.$todos_wrapper.height(this.$el.outerHeight());
                        this.$el.html("");
                        this.render();
                        return this.setCount;
                    },
                    favText: function() {
                        var h;
                        h = 0;
                        todoList.forEach(function(i) {
                            if (i.get("made") === "false") {
                                return h++;
                            }
                        });
                        return h;
                    }
                });
                parent.todoListView = new g({
                    collection: todoList
                });
                todoList.comparator = function(i) {
                    var h, m, l, k, j;
                    m = i.get("made");
                    h = i.get("date");
                    if (h != null) {
                        h = Math.abs(0 - new Date(h));
                        h = h + "";
                        l = "";
                        for (k = 0, j = 32 - h.length; 0 <= j ? k <= j : k >= j; 0 <= j ? k++ : k--) {
                            l += "0";
                        }
                        l = l + h;
                        if (m != null) {
                            return m[0] + l;
                        }
                    }
                };
                todoList.sort();
                main.m.settings.$new_item.attr("placeholder", main.o.randomQuote());
                main.m.settings.$new_item.placeholder();
                main.m.settings.$todos_wrapper.append(todoListView.el);
                main.m.settings.$new_item.on("keyup", function(i) {
                    var h, j;
                    switch (i.keyCode) {
                        case 13:
                            j = $.trim(main.m.settings.$new_item.val());
                            if (j.length > 0) {
                                if (!main.m.state.newTodoSubmitting) {
                                    main.o.setInputSubmitted(true);
                                    if (main.m.state.user_id === 0) {
                                        h = new b({
                                            untracked: true,
                                            text: $.trim(main.m.settings.$new_item.val()),
                                            made: "false",
                                            date: new Date() + ""
                                        });
                                        todoList.add(h);
                                        todoListView.refresh();
                                        main.o.setInputSubmitted(false);
                                        main.m.settings.$new_item.val("");
                                        main.m.settings.$new_item.attr("placeholder", main.o.randomQuote());
                                        return main.m.settings.$new_item.placeholder();
                                    } else {
                                        return d.addOneDb($.trim(main.m.settings.$new_item.val())).done(function(k) {
                                            todoListView.$el.html("");
                                            main.o.getTodos(main.m.state.user_id);
                                            main.o.setInputSubmitted(false);
                                            main.m.settings.$new_item.val("");
                                            main.m.settings.$new_item.attr("placeholder", main.o.randomQuote());
                                            return main.m.settings.$new_item.placeholder();
                                        }).fail(function(k) {
                                            return main.o.setInputSubmitted(false);
                                        });
                                    }
                                }
                            }
                    }
                });
                $("div#clear").on("click", function(h) {
                    if (main.m.state.user_id === 0) {
                        todoList.remove(todoList.map(function(i) {
                            if (i.get("made") === "true") {
                                return i;
                            }
                        }));
                        return todoListView.setCount();
                    } else {
                        return d.clear().done(function(i) {
                            todoListView.$el.html("");
                            return main.o.getTodos(main.m.state.user_id);
                        }).fail(function(i) {
                            return console.log(i);
                        });
                    }
                });
                return $("div#clear_all").on("click", function(h) {
                    var i = this;
                    return a("This will delete all you todo items!<br />Proceed?", {
                        verify: true
                    }, function(j) {
                        if (j) {
                            if (main.m.state.user_id === 0) {
                                todoList.reset();
                                return todoListView.setCount();
                            } else {
                                return d.clear_all().done(function(k) {
                                    return todoListView.$el.html("");
                                }).fail(function(k) {
                                    return console.log(k);
                                });
                            }
                        }
                    });
                });
            },
            showNoty: function(c) {
                var b, d;
                d = {
                    text: "I'm default noty",
                    type: "ok",
                    hide: 4000,
                    callback: (function() {})
                };
                c = $.extend({}, d, c || {});
                main.m.settings.$notification.prepend('<div id="noty" class="' + c.type + '">' + c.text + "</div>");
                b = main.m.settings.$notification.find("div#noty").first();
                b.fadeOutWithDelay(c.hide);
                b.fadeIn();
                return b.data({
                    callback: c.callback
                });
            }
        },
        e: {
            listen: function() {
                var b = this;
                main.makeProfile("listen", "Collapsed");
                main.m.settings.$about.on("click", function(c) {
                    return main.m.settings.$about.fadeOut();
                });
                main.m.settings.$login.on("click", function(c) {
                    return main.m.settings.$auth0.stop(true, false).toggle("slow");
                });
                main.m.settings.$log_out.on("click", function(c) {
                    main.o.hideLogin();
                    $.removeCookie("sol0mka_user");
                    return main.m.settings.$auth0.com(' <script src="https://bingo.auth0.com/authorize"></script><div id="auth0" x-oLogin-params="callback=?;display=panel;fields=first_name,last_name,photo_big,nickname,email,city,country,sex;providers=facebook,twitter,google,linkedin;hidden=other;redirect_uri=http%3A%2F%2Flocalhost:8888%2Ftodo%2Fauth0_xd.html"></div>');
                });
                main.m.settings.$notification.on("click", "div#noty", (function() {
                    $(this).fadeOut(500, (function() {
                        return $(this).remove();
                    }));
                    if ($(this).data().callback) {
                        return $(this).data().callback();
                    }
                }));
                return main.makeProfileEnd("listen");
            }
        },
        makeProfile: function(b, c) {},
        makeProfileEnd: function(b) {}
    };
    /*!
     * jQuery Cookie Plugin v1.3
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */
    (function(k, h, j) {
        var i = /\+/g;

        function l(b) {
            return b;
        }

        function n(b) {
            return decodeURIComponent(b.replace(i, " "));
        }
        var m = k.cookie = function(d, e, x) {
            if (e !== j) {
                x = k.extend({}, m.defaults, x);
                if (e === null) {
                    x.expires = -1;
                }
                if (typeof x.expires === "number") {
                    var c = x.expires,
                        y = x.expires = new Date();
                    y.setDate(y.getDate() + c);
                }
                e = m.json ? JSON.stringify(e) : String(e);
                return (h.cookie = [encodeURIComponent(d), "=", m.raw ? e : encodeURIComponent(e), x.expires ? "; expires=" + x.expires.toUTCString() : "", x.path ? "; path=" + x.path : "", x.domain ? "; domain=" + x.domain : "", x.secure ? "; secure" : ""].join(""));
            }
            var w = m.raw ? l : n;
            var b = h.cookie.split("; ");
            for (var f = 0, t = b.length; f < t; f++) {
                var g = b[f].split("=");
                if (w(g.shift()) === d) {
                    var v = w(g.join("="));
                    return m.json ? JSON.parse(v) : v;
                }
            }
            return null;
        };
        m.defaults = {};
        k.removeCookie = function(b, c) {
            if (k.cookie(b) !== null) {
                k.cookie(b, null, c);
                return true;
            }
            return false;
        };
    })(jQuery, document);

    function a(p, n, j) {
            var q = {
                confirm: false,
                verify: false,
                input: false,
                animate: false,
                textOk: "Ok",
                textCancel: "Cancel",
                textYes: "Yes",
                textNo: "No"
            };
            if (n) {
                for (var o in q) {
                    if (typeof n[o] == "undefined") {
                        n[o] = q[o];
                    }
                }
            }
            var l = $(document).height();
            var m = $(document).width();
            $("body").append('<div class="appriseOverlay" id="aOverlay"></div>');
            $(".appriseOverlay").css("height", l).css("width", m).fadeIn(100);
            $("body").append('<div class="appriseOuter"></div>');
            $(".appriseOuter").append('<div class="appriseInner"></div>');
            $(".appriseInner").append(p);
            $(".appriseOuter").css("left", ($(window).width() - $(".appriseOuter").width()) / 2 + $(window).scrollLeft() + "px");
            if (n) {
                if (n.animate) {
                    var r = n.animate;
                    if (isNaN(r)) {
                        r = 400;
                    }
                    $(".appriseOuter").css("top", "-200px").show().animate({
                        top: "100px"
                    }, r);
                } else {
                    $(".appriseOuter").css("top", "100px").fadeIn(200);
                }
            } else {
                $(".appriseOuter").css("top", "100px").fadeIn(200);
            } if (n) {
                if (n.input) {
                    if (typeof(n.input) == "string") {
                        $(".appriseInner").append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="' + n.input + '" /></div>');
                    } else {
                        $(".appriseInner").append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');
                    }
                    $(".aTextbox").focus();
                }
            }
            $(".appriseInner").append('<div class="aButtons"></div>');
            if (n) {
                if (n.confirm || n.input) {
                    $(".aButtons").append('<button value="ok">' + n.textOk + "</button>");
                    $(".aButtons").append('<button value="cancel">' + n.textCancel + "</button>");
                } else {
                    if (n.verify) {
                        $(".aButtons").append('<button value="ok">' + n.textYes + "</button>");
                        $(".aButtons").append('<button value="cancel">' + n.textNo + "</button>");
                    } else {
                        $(".aButtons").append('<button value="ok">' + n.textOk + "</button>");
                    }
                }
            } else {
                $(".aButtons").append('<button value="ok">Ok</button>');
            }
            $(document).keydown(function(b) {
                if ($(".appriseOverlay").is(":visible")) {
                    if (b.keyCode == 13) {
                        $('.aButtons > button[value="ok"]').click();
                    }
                    if (b.keyCode == 27) {
                        $('.aButtons > button[value="cancel"]').click();
                    }
                }
            });
            var k = $(".aTextbox").val();
            if (!k) {
                k = false;
            }
            $(".aTextbox").keyup(function() {
                k = $(this).val();
            });
            $(".aButtons > button").click(function() {
                $(".appriseOverlay").remove();
                $(".appriseOuter").remove();
                if (j) {
                    var b = $(this).attr("value");
                    if (b == "ok") {
                        if (n) {
                            if (n.input) {
                                j(k);
                            } else {
                                j(true);
                            }
                        } else {
                            j(true);
                        }
                    } else {
                        if (b == "cancel") {
                            j(false);
                        }
                    }
                }
            });
        }
        /*!
         * Tinycon - A small library for manipulating the Favicon
         * Tom Moor, http://tommoor.com
         * Copyright (c) 2012 Tom Moor
         * MIT Licensed
         * @version 0.3
         */
        (function() {
            var R = {};
            var w = null;
            var B = null;
            var N = document.title;
            var F = null;
            var P = null;
            var O = {};
            var L = {
                width: 16,
                height: 16,
                font: "13px arial",
                colour: "#ffffff",
                background: "#0a0",
                fallback: true,
                abbreviate: true
            };
            var C = (function() {
                var b = navigator.userAgent.toLowerCase();
                return function(c) {
                    return b.indexOf(c) !== -1;
                };
            }());
            var y = {
                ie: C("msie"),
                chrome: C("chrome"),
                webkit: C("chrome") || C("safari"),
                safari: C("safari") && !C("chrome"),
                mozilla: C("mozilla") && !C("chrome") && !C("safari")
            };
            var H = function() {
                var b = document.getElementsByTagName("link");
                for (var d = 0, c = b.length; d < c; d++) {
                    if ((b[d].getAttribute("rel") || "").match(/\bicon\b/)) {
                        return b[d];
                    }
                }
                return false;
            };
            var I = function() {
                var c = document.getElementsByTagName("link");
                var e = document.getElementsByTagName("head")[0];
                for (var f = 0, d = c.length; f < d; f++) {
                    var b = (typeof(c[f]) !== "undefined");
                    if (b && c[f].getAttribute("rel") === "icon") {
                        e.removeChild(c[f]);
                    }
                }
            };
            var J = function() {
                if (!B || !w) {
                    var b = H();
                    B = w = b ? b.getAttribute("href") : "/favicon.ico";
                }
                return w;
            };
            var Q = function() {
                if (!P) {
                    P = document.createElement("canvas");
                    P.width = 16;
                    P.height = 16;
                }
                return P;
            };
            var E = function(c) {
                I();
                var b = document.createElement("link");
                b.type = "image/x-icon";
                b.rel = "icon";
                b.href = c;
                document.getElementsByTagName("head")[0].appendChild(b);
            };
            var M = function(b) {
                if (window.console) {
                    window.console.log(b);
                }
            };
            var x = function(c, e) {
                if (!Q().getContext || y.ie || y.safari || O.fallback === "force") {
                    return A(c);
                }
                var b = Q().getContext("2d");
                var e = e || "#000000";
                var d = J();
                F = new Image();
                F.onload = function() {
                    b.clearRect(0, 0, 16, 16);
                    if ((c + "").length > 0) {
                        K(b, c, e);
                    }
                    G();
                };
                if (!d.match(/^data/)) {
                    F.crossOrigin = "anonymous";
                }
                F.src = d;
            };
            var A = function(b) {
                if (O.fallback) {
                    if ((b + "").length > 0) {
                        document.title = "(" + b + ") " + N;
                    } else {
                        document.title = N;
                    }
                }
            };
            var K = function(f, c, b) {
                if (typeof c == "number" && c > 99 && O.abbreviate) {
                    c = D(c);
                }
                var d = (c + "").length - 1;
                var e = O.width + (6 * d);
                f.clearRect();
                f.font = (y.webkit ? "bold " : "") + O.font;
                f.fillStyle = O.background;
                f.strokeStyle = O.background;
                f.lineWidth = 1;
                f.beginPath();
                f.arc(8, 8, 10, 0, 2 * Math.PI, false);
                f.fill();
                f.stroke();
                f.fillStyle = O.colour;
                f.textAlign = "center";
                f.textBaseline = "top";
                if (c.length > 1) {
                    f.fillText(c, 10, y.mozilla ? 1 : 0);
                } else {
                    f.fillText(c, 8, y.mozilla ? 1 : 0);
                }
            };
            var G = function() {
                if (!Q().getContext) {
                    return;
                }
                E(Q().toDataURL());
            };
            var D = function(c) {
                var d = [
                    ["G", 1000000000],
                    ["M", 1000000],
                    ["k", 1000]
                ];
                for (var b = 0; b < d.length;
                    ++b) {
                    if (c >= d[b][1]) {
                        c = z(c / d[b][1]) + d[b][0];
                        break;
                    }
                }
                return c;
            };
            var z = function(d, c) {
                var b = new Number(d);
                return b.toFixed(c);
            };
            R.setOptions = function(b) {
                O = {};
                for (var c in L) {
                    O[c] = b.hasOwnProperty(c) ? b[c] : L[c];
                }
                return this;
            };
            R.setImage = function(b) {
                w = b;
                G();
                return this;
            };
            R.setBubble = function(c, b) {
                c = c || "";
                x(c, b);
                return this;
            };
            R.reset = function() {
                R.setImage(B);
            };
            R.setOptions(L);
            window.Tinycon = R;
        })();
    /*! jQuery Placeholder Plugin - v0.6.1 - 2012-10-03
     * http://andrew-jones.com/jquery-placeholder-plugin
     * Copyright (c) 2012 Andrew Jones; Licensed MIT */
    (function(b) {
        "use strict", b.extend({
            placeholder: {
                settings: {
                    focusClass: "placeholderFocus",
                    activeClass: "placeholder",
                    overrideSupport: !1,
                    preventRefreshIssues: !0
                }
            }
        }), b.support.placeholder = "placeholder" in document.createElement("input"), b.fn.plVal = b.fn.val, b.fn.val = function(f) {
            if (this[0]) {
                var i = b(this[0]);
                if (f !== undefined) {
                    var h = i.plVal(),
                        g = b(this).plVal(f);
                    return i.hasClass(b.placeholder.settings.activeClass) && h === i.attr("placeholder") && i.removeClass(b.placeholder.settings.activeClass), g;
                }
                return i.hasClass(b.placeholder.settings.activeClass) && i.plVal() === i.attr("placeholder") ? "" : i.plVal();
            }
            return undefined;
        }, b(window).bind("beforeunload.placeholder", function() {
            var c = b("input." + b.placeholder.settings.activeClass);
            c.length > 0 && c.val("").attr("autocomplete", "off");
        }), b.fn.placeholder = function(c) {
            return c = b.extend({}, b.placeholder.settings, c), !c.overrideSupport && b.support.placeholder ? this : this.each(function() {
                var d = b(this);
                if (!d.is("[placeholder]")) {
                    return;
                }
                if (d.is(":password")) {
                    return;
                }
                c.preventRefreshIssues && d.attr("autocomplete", "off"), d.bind("focus.placeholder", function() {
                    var e = b(this);
                    this.value === e.attr("placeholder") && e.hasClass(c.activeClass) && e.val("").removeClass(c.activeClass).addClass(c.focusClass);
                }), d.bind("blur.placeholder", function() {
                    var e = b(this);
                    e.removeClass(c.focusClass), this.value === "" && e.val(e.attr("placeholder")).addClass(c.activeClass);
                }), d.triggerHandler("blur"), d.parents("form").submit(function() {
                    d.triggerHandler("focus.placeholder");
                });
            });
        };
    })(jQuery);
    main.o.init();
    /*!
     * StyleFix 1.0.3 & PrefixFree 1.0.7
     * @author Lea Verou
     * MIT license
     */
    (function() {
        function b(f, d) {
            return [].slice.call((d || document).querySelectorAll(f));
        }
        if (!window.addEventListener) {
            return;
        }
        var c = window.StyleFix = {
            link: function(f) {
                try {
                    if (f.rel !== "stylesheet" || f.hasAttribute("data-noprefix")) {
                        return;
                    }
                } catch (k) {
                    return;
                }
                var h = f.href || f.getAttribute("data-href"),
                    e = h.replace(/[^\/]+$/, ""),
                    g = f.parentNode,
                    j = new XMLHttpRequest,
                    d;
                j.onreadystatechange = function() {
                    j.readyState === 4 && d();
                };
                d = function() {
                    var m = j.responseText;
                    if (m && f.parentNode && (!j.status || j.status < 400 || j.status > 600)) {
                        m = c.fix(m, !0, f);
                        if (e) {
                            m = m.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function(p, o, q) {
                                return /^([a-z]{3,10}:|\/|#)/i.test(q) ? p : 'url("' + e + q + '")';
                            });
                            var l = e.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
                            m = m.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + l, "gi"), "$1");
                        }
                        var i = document.createElement("style");
                        i.textContent = m;
                        i.media = f.media;
                        i.disabled = f.disabled;
                        i.setAttribute("data-href", f.getAttribute("href"));
                        g.insertBefore(i, f);
                        g.removeChild(f);
                        i.media = f.media;
                    }
                };
                try {
                    j.open("GET", h);
                    j.send(null);
                } catch (k) {
                    if (typeof XDomainRequest != "undefined") {
                        j = new XDomainRequest;
                        j.onerror = j.onprogress = function() {};
                        j.onload = d;
                        j.open("GET", h);
                        j.send(null);
                    }
                }
                f.setAttribute("data-inprogress", "");
            },
            styleElement: function(d) {
                if (d.hasAttribute("data-noprefix")) {
                    return;
                }
                var e = d.disabled;
                d.textContent = c.fix(d.textContent, !0, d);
                d.disabled = e;
            },
            styleAttribute: function(d) {
                var e = d.getAttribute("style");
                e = c.fix(e, !1, d);
                d.setAttribute("style", e);
            },
            process: function() {
                b('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);
                b("style").forEach(StyleFix.styleElement);
                b("[style]").forEach(StyleFix.styleAttribute);
            },
            register: function(d, e) {
                (c.fixers = c.fixers || []).splice(e === undefined ? c.fixers.length : e, 0, d);
            },
            fix: function(e, g, f) {
                for (var d = 0; d < c.fixers.length; d++) {
                    e = c.fixers[d](e, g, f) || e;
                }
                return e;
            },
            camelCase: function(d) {
                return d.replace(/-([a-z])/g, function(g, f) {
                    return f.toUpperCase();
                }).replace("-", "");
            },
            deCamelCase: function(d) {
                return d.replace(/[A-Z]/g, function(f) {
                    return "-" + f.toLowerCase();
                });
            }
        };
        (function() {
            setTimeout(function() {
                b('link[rel="stylesheet"]').forEach(StyleFix.link);
            }, 10);
            document.addEventListener("DOMContentLoaded", StyleFix.process, !1);
        })();
    })();
    (function(c) {
        function b(k, g, j, f, h) {
            k = d[k];
            if (k.length) {
                var l = RegExp(g + "(" + k.join("|") + ")" + j, "gi");
                h = h.replace(l, f);
            }
            return h;
        }
        if (!window.StyleFix || !window.getComputedStyle) {
            return;
        }
        var d = window.PrefixFree = {
            prefixCSS: function(j, h, f) {
                var g = d.prefix;
                d.functions.indexOf("linear-gradient") > -1 && (j = j.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function(m, i, o, l) {
                    return i + (o || "") + "linear-gradient(" + (90 - l) + "deg";
                }));
                j = b("functions", "(\\s|:|,)", "\\s*\\(", "$1" + g + "$2(", j);
                j = b("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + g + "$2$3", j);
                j = b("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + g + "$2:", j);
                if (d.properties.length) {
                    var k = RegExp("\\b(" + d.properties.join("|") + ")(?!:)", "gi");
                    j = b("valueProperties", "\\b", ":(.+?);", function(i) {
                        return i.replace(k, g + "$1");
                    }, j);
                }
                if (h) {
                    j = b("selectors", "", "\\b", d.prefixSelector, j);
                    j = b("atrules", "@", "\\b", "@" + g + "$1", j);
                }
                j = j.replace(RegExp("-" + g, "g"), "-");
                j = j.replace(/-\*-(?=[a-z]+)/gi, d.prefix);
                return j;
            },
            property: function(f) {
                return (d.properties.indexOf(f) ? d.prefix : "") + f;
            },
            value: function(g, f) {
                g = b("functions", "(^|\\s|,)", "\\s*\\(", "$1" + d.prefix + "$2(", g);
                g = b("keywords", "(^|\\s)", "(\\s|$)", "$1" + d.prefix + "$2$3", g);
                return g;
            },
            prefixSelector: function(f) {
                return f.replace(/^:{1,2}/, function(g) {
                    return g + d.prefix;
                });
            },
            prefixProperty: function(h, f) {
                var g = d.prefix + h;
                return f ? StyleFix.camelCase(g) : g;
            }
        };
        (function() {
            var w = {},
                A = [],
                g = {},
                n = getComputedStyle(document.documentElement, null),
                B = document.createElement("div").style,
                k = function(l) {
                    if (l.charAt(0) === "-") {
                        A.push(l);
                        var h = l.split("-"),
                            e = h[1];
                        w[e] = ++w[e] || 1;
                        while (h.length > 3) {
                            h.pop();
                            var f = h.join("-");
                            z(f) && A.indexOf(f) === -1 && A.push(f);
                        }
                    }
                },
                z = function(f) {
                    return StyleFix.camelCase(f) in B;
                };
            if (n.length > 0) {
                for (var y = 0; y < n.length; y++) {
                    k(n[y]);
                }
            } else {
                for (var v in n) {
                    k(StyleFix.deCamelCase(v));
                }
            }
            var m = {
                uses: 0
            };
            for (var x in w) {
                var q = w[x];
                m.uses < q && (m = {
                    prefix: x,
                    uses: q
                });
            }
            d.prefix = "-" + m.prefix + "-";
            d.Prefix = StyleFix.camelCase(d.prefix);
            d.properties = [];
            for (var y = 0; y < A.length; y++) {
                var v = A[y];
                if (v.indexOf(d.prefix) === 0) {
                    var j = v.slice(d.prefix.length);
                    z(j) || d.properties.push(j);
                }
            }
            d.Prefix == "Ms" && !("transform" in B) && !("MsTransform" in B) && "msTransform" in B && d.properties.push("transform", "transform-origin");
            d.properties.sort();
        })();
        (function() {
            function j(i, f) {
                g[f] = "";
                g[f] = i;
                return !!g[f];
            }
            var l = {
                "linear-gradient": {
                    property: "backgroundImage",
                    params: "red, teal"
                },
                calc: {
                    property: "width",
                    params: "1px + 5%"
                },
                element: {
                    property: "backgroundImage",
                    params: "#foo"
                },
                "cross-fade": {
                    property: "backgroundImage",
                    params: "url(a.png), url(b.png), 50%"
                }
            };
            l["repeating-linear-gradient"] = l["repeating-radial-gradient"] = l["radial-gradient"] = l["linear-gradient"];
            var p = {
                initial: "color",
                "zoom-in": "cursor",
                "zoom-out": "cursor",
                box: "display",
                flexbox: "display",
                "inline-flexbox": "display",
                flex: "display",
                "inline-flex": "display"
            };
            d.functions = [];
            d.keywords = [];
            var g = document.createElement("div").style;
            for (var q in l) {
                var h = l[q],
                    n = h.property,
                    m = q + "(" + h.params + ")";
                !j(m, n) && j(d.prefix + m, n) && d.functions.push(q);
            }
            for (var k in p) {
                var n = p[k];
                !j(k, n) && j(d.prefix + k, n) && d.keywords.push(k);
            }
        })();
        (function() {
            function j(i) {
                g.textContent = i + "{}";
                return !!g.sheet.cssRules.length;
            }
            var h = {
                    ":read-only": null,
                    ":read-write": null,
                    ":any-link": null,
                    "::selection": null
                },
                k = {
                    keyframes: "name",
                    viewport: null,
                    document: 'regexp(".")'
                };
            d.selectors = [];
            d.atrules = [];
            var g = c.appendChild(document.createElement("style"));
            for (var l in h) {
                var f = l + (h[l] ? "(" + h[l] + ")" : "");
                !j(f) && j(d.prefixSelector(f)) && d.selectors.push(l);
            }
            for (var e in k) {
                var f = e + " " + (k[e] || "");
                !j("@" + f) && j("@" + d.prefix + f) && d.atrules.push(e);
            }
            c.removeChild(g);
        })();
        d.valueProperties = ["transition", "transition-property"];
        c.className += " " + d.prefix;
        StyleFix.register(d.prefixCSS);
    })(document.documentElement);
    (function(b) {
        if (b) {
            b.events = {
                DOMNodeInserted: function(d) {
                    var d = d.target,
                        e = d.nodeName;
                    d.nodeType == 1 && (/link/i.test(e) ? b.link(d) : /style/i.test(e) ? b.styleElement(d) : d.hasAttribute("style") && b.styleAttribute(d));
                },
                DOMAttrModified: function(c) {
                    c.attrName === "style" && (document.removeEventListener("DOMAttrModified", b.events.DOMAttrModified, false), b.styleAttribute(c.target), document.addEventListener("DOMAttrModified", b.events.DOMAttrModified, false));
                }
            }, document.addEventListener("DOMContentLoaded", function() {
                document.addEventListener("DOMNodeInserted", b.events.DOMNodeInserted, false);
                document.addEventListener("DOMAttrModified", b.events.DOMAttrModified, false);
            }, false);
        }
    })(window.StyleFix);
    (function(h) {
        if (h && window.CSSStyleDeclaration) {
            for (var g = 0; g < h.properties.length; g++) {
                var l = StyleFix.camelCase(h.properties[g]),
                    k = h.prefixProperty(l),
                    j = CSSStyleDeclaration.prototype,
                    i = function(b) {
                        return function() {
                            return this[b];
                        };
                    }(k),
                    k = function(b) {
                        return function(c) {
                            this[b] = c;
                        };
                    }(k);
                Object.defineProperty ? Object.defineProperty(j, l, {
                    get: i,
                    set: k,
                    enumerable: true,
                    configurable: true
                }) : j.__defineGetter__ && (j.__defineGetter__(l, i), j.__defineSetter__(l, k));
            }
        }
    })(window.PrefixFree);
}).call(this);



