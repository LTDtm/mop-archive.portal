var LOCALE_ENUS = 0;
var LOCALE_FRFR = 2;
var LOCALE_DEDE = 3;
var LOCALE_ESES = 6;
var LOCALE_RURU = 7;
var LOCALE_PTBR = 8;
var LOCALE_ITIT = 9;
var Locale = {current: {},locales: {0: {id: LOCALE_ENUS,name: "enus",domain: "www.wowhead.com",description: "English"},2: {id: LOCALE_FRFR,name: "frfr",domain: "fr.wowhead.com",description: "Fran" + String.fromCharCode(231) + "ais"},3: {id: LOCALE_DEDE,name: "dede",domain: "de.wowhead.com",description: "Deutsch"},6: {id: LOCALE_ESES,name: "eses",domain: "es.wowhead.com",description: "Espa" + String.fromCharCode(241) + "ol"},7: {id: LOCALE_RURU,name: "ruru",domain: "ru.wowhead.com",description: String.fromCharCode(1056, 1091, 1089, 1089, 1082, 1080, 1081)},8: {id: LOCALE_PTBR,name: "ptbr",domain: "pt.wowhead.com",description: "Português Brasileiro"},9: {id: LOCALE_ITIT,name: "itit",domain: "it.wowhead.com",description: "Italiano"}},getAll: function() {
        var b = [];
        for (var c in Locale.locales) {
            b.push(Locale.locales[c])
        }
        return b
    },getAllByName: function() {
        var b = Locale.getAll();
        b.sort(function(e, c) {
            return $WH.strcmp(e.description, c.description)
        });
        return b
    },getId: function() {
        return Locale.current.id
    },getName: function() {
        var b = Locale.getId();
        return Locale.locales[b].name
    },get: function() {
        var b = Locale.getId();
        return Locale.locales[b]
    },set: function(b) {
        $.extend(Locale.current, Locale.locales[b])
    }};
Locale.set(LOCALE_ENUS);

var MARKUP_MODE_COMMENT = 1,
    MARKUP_MODE_ARTICLE = 2,
    MARKUP_MODE_QUICKFACTS = 3,
    MARKUP_MODE_SIGNATURE = 4,
    MARKUP_MODE_REPLY = 5,
    MARKUP_CLASS_ADMIN = 40,
    MARKUP_CLASS_STAFF = 30,
    MARKUP_CLASS_PREMIUM = 20,
    MARKUP_CLASS_USER = 10,
    MARKUP_CLASS_PENDING = 1;
var MARKUP_SOURCE_LIVE = 1,
    MARKUP_SOURCE_PTR = 2,
    MARKUP_SOURCE_BETA = 3;
var MarkupModeMap = {};
MarkupModeMap[MARKUP_MODE_COMMENT] = "comment";
MarkupModeMap[MARKUP_MODE_REPLY] = "reply";
MarkupModeMap[MARKUP_MODE_ARTICLE] = "article";
MarkupModeMap[MARKUP_MODE_QUICKFACTS] = "quickfacts";
MarkupModeMap[MARKUP_MODE_SIGNATURE] = "signature";
var MarkupSourceMap = {};
MarkupSourceMap[MARKUP_SOURCE_LIVE] = "live";
MarkupSourceMap[MARKUP_SOURCE_PTR] = "ptr";
MarkupSourceMap[MARKUP_SOURCE_BETA] = "beta";
var MarkupIconPath = "/tb";
var Markup = {
    MODE_COMMENT: MARKUP_MODE_COMMENT,
    MODE_REPLY: MARKUP_MODE_REPLY,
    MODE_ARTICLE: MARKUP_MODE_ARTICLE,
    MODE_QUICKFACTS: MARKUP_MODE_QUICKFACTS,
    MODE_SIGNATURE: MARKUP_MODE_SIGNATURE,
    SOURCE_LIVE: MARKUP_SOURCE_LIVE,
    SOURCE_PTR: MARKUP_SOURCE_PTR,
    SOURCE_BETA: MARKUP_SOURCE_BETA,
    CLASS_ADMIN: MARKUP_CLASS_ADMIN,
    CLASS_STAFF: MARKUP_CLASS_STAFF,
    CLASS_PREMIUM: MARKUP_CLASS_PREMIUM,
    CLASS_USER: MARKUP_CLASS_USER,
    CLASS_PENDING: MARKUP_CLASS_PENDING,
    whitelistedWebsites: [/(.*\.)?wowhead.com/i, /(.*\.)?shoot.tauri.hu/i, /(.*\.)?cata-shoot.tauri.hu/i, /(.*\.)?mop-shoot.tauri.hu/i, /(.*\.)?torhead.com/i, /(.*\.)?mmoui.com/i, /(.*\.)?tankspot.com/i, /(.*\.)?guildfans.com/i, /(.*\.)?allakhazam.com/i, /(.*\.)?zam.com/i, /(.*\.)?blizzard.com/i, /(.*\.)?worldofwarcraft.com/i, /(.*\.)?wow-europe.com/i, /(.*\.)?battle.net/i, /(.*\.)?sc2ranks.com/i, /(.*\.)?torchlightarmory.com/i, /(.*\.)?vindictusdb.com/i, /(.*\.)?wowinterface.com/i, /(.*\.)?vginterface.com/i, /(.*\.)?lotrointerface.com/i, /(.*\.)?eq2interface.com/i, /(.*\.)?eqinterface.com/i, /(.*\.)?mmo-champion.com/i, /(.*\.)?joystiq.com/i, /(.*\.)?wow-heroes.com/i, /(.*\.)?be-imba.hu/i, /(.*\.)?wowpedia.org/i, /(.*\.)?curse.com/i, /(.*\.)?elitistjerks.com/i, /(.*\.)?wowwiki.com/i, /(.*\.)?worldoflogs.com/i, /(.*\.)?wowinsider.com/i, /(.*\.)?guildwork.com/i, /(.*\.)?hearthhead\.com/i],
    rolesToClass: function (b) {
        if (b & (U_GROUP_ADMIN | U_GROUP_VIP | U_GROUP_DEV)) {
            return Markup.CLASS_ADMIN
        } else {
            if (b & U_GROUP_STAFF) {
                return Markup.CLASS_STAFF
            } else {
                if (b & U_GROUP_PREMIUM) {
                    return Markup.CLASS_PREMIUM
                } else {
                    if (b & U_GROUP_PENDING) {
                        return Markup.CLASS_PENDING
                    } else {
                        return Markup.CLASS_USER
                    }
                }
            }
        }
    },
    timers: {
        spoilers: null
    },
    defaultSource: false,
    nameCol: "name_enus",
    domainToLocale: {
        www: "enus",
        ptr: "ptr",
        beta: "beta",
        mop: "beta",
        wod: "beta",
        fr: "frfr",
        de: "dede",
        es: "eses",
        ru: "ruru",
        pt: "ptbr",
        it: "itit"
    },
    maps: [],
    firstTags: {},
    postTags: [],
    collectTags: {},
    excludeTags: {},
    tooltipTags: {},
    tooltipBare: {},
    attributes: {
        id: {
            req: false,
            valid: /^[a-z0-9_-]+$/i
        },
        title: {
            req: false,
            valid: /[\S ]+/
        },
        "class": {
            req: false,
            valid: /\S+/
        }
    },
    IsLinkAllowed: function (f) {
        var g = f.match("[a-z]+://([a-z0-9.-]+)");
        if (!g) {
            return true
        }
        var b = g[1];
        var h = false;
        for (var c in Markup.whitelistedWebsites) {
            var e = Markup.whitelistedWebsites[c];
            if (b.search(e) == 0) {
                h = true
            }
        }
        return h
    },
    tags: {
        "<text>": {
            empty: true,
            noHelp: true,
            allowInReplies: true,
            toHtml: function (c, b) {
                b = b || $.noop;
                if (c._text == " " && !b.noNbsp) {
                    c._text = "&nbsp;"
                }
                c._text = c._text.replace(/\\\[/g, "[");
                if (b && b.noLink) {
                    return c._text
                } else {
                    if (b && b.needsRaw) {
                        return c._rawText
                    } else {
                        var f = [];
                        var g = Markup._preText(c._rawText.replace(/(https?:\/\/|www\.)([\/_a-z0-9\%\?#@\-\+~&=;:'|]|\.[a-z0-9\-])+/gi, function (h) {
                            matchUrl = Markup._preText(h.replace(/^www/, "http://www"));
                            h = Markup._preText(h);
                            var j = f.length;
                            f.push([matchUrl, h]);
                            return "$L" + j
                        }));
                        g = g.replace(/\$L([\d+]) /gi, "$L$1&nbsp;");
                        for (var e in f) {
                            g = g.replace("$L" + e, function (j) {
                                if (Markup.allow < Markup.CLASS_USER && !Markup.IsLinkAllowed(f[e][0])) {
                                    return sprintf('<span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG.linkremoved_tip, 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">[$1]</span>', LANG.linkremoved)
                                }
                                var h = '<a href="' + f[e][0] + '"';
                                if (Markup._isUrlExternal(f[e][0])) {
                                    h += ' target="_blank"'
                                }
                                h += ">" + f[e][1] + "</a>";
                                return h
                            })
                        }
                        return g
                    }
                }
            },
            toText: function (b) {
                return b._text
            }
        },
        achievement: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                diff: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                diffnew: {
                    req: false,
                    valid: /^1$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (c) {
                var j = c.unnamed;
                var h = Markup._getDatabaseDomainInfo(c);
                var f = h[0];
                var g = h[1];
                var b = [];
                if (c.diff) {
                    b.push("diff=" + c.diff)
                }
                if (c.diffnew) {
                    b.push("diffnew=" + c.diffnew)
                }
                if (g_achievements[j] && g_achievements[j][g]) {
                    var e = g_achievements[j];
                    return '<a href="' + f + "?achievement=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + (!c.icon ? ' class="iconsmall"><img src="' + g_staticUrl + "/images/icons/tiny/" + e.icon.toLowerCase() + '.png"' : "") + Markup._addGlobalAttributes(c) + ' align="absmiddle" /> <span class="tinyicontxt">' + Markup._safeHtml(e[g]) + "</span></a>"
                }
                return '<a href="' + f + "?achievement=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + Markup._addGlobalAttributes(c) + ">(" + LANG.types[10][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_achievements[g] && g_achievements[g][e]) {
                    return Markup._safeHtml(g_achievements[g][e])
                }
                return LANG.types[10][0] + " #" + g
            }
        },
        achievementpoints: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"' + Markup._addGlobalAttributes(b) + ">" + b.unnamed + "</span>";
                return c
            }
        },
        anchor: {
            empty: true,
            ltrim: true,
            rtrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                }
            },
            validate: function (b) {
                if (!b.unnamed && !b.id) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                if (!b.unnamed && b.id) {
                    b.unnamed = b.id;
                    b.id = null
                }
                return '<a name="' + b.unnamed + '"' + Markup._addGlobalAttributes(b) + "></a>"
            }
        },
        acronym: {
            empty: false,
            attr: {
                unnamed: {
                    req: true
                }
            },
            toHtml: function (b) {
                return ['<span class="tip" onmouseover="Tooltip.showAtCursor(event, \'' + Markup._safeHtml(b.unnamed) + '\', 0, 0, \'q1\');" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()" ' + Markup._addGlobalAttributes(b) + ">", "</span>"]
            }
        },
        b: {
            empty: false,
            allowInReplies: true,
            toHtml: function (b) {
                return ["<b" + Markup._addGlobalAttributes(b) + ">", "</b>"]
            },
            fromHtml: function (b) {
                return b.replace(/<(b|big|strong)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[b]$2[/b]")
            }
        },
        blip: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = "http://blip.tv/play/" + b.unnamed;
                var f = 600;
                var g = 368;
                var e = "";
                e += '<embed width="' + f + '" height="' + g + '" src="' + c + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
                return e
            }
        },
        br: {
            empty: true,
            toHtml: function (b) {
                return "<br />"
            },
            fromHtml: function (b) {
                return b.replace(/<br\b[\s\S]*?>/gi, "\n")
            }
        },
        building: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_buildings[h] && g_buildings[h][f]) {
                    var c = g_buildings[h];
                    return '<a href="' + e + "?building=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(c[f]) + "</a>"
                }
                return '<a href="' + e + "?building=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[20][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_buildings[f] && g_buildings[f][c]) {
                    return Markup._safeHtml(g_buildings[f][c])
                }
                return LANG.types[20][0] + " #" + f
            }
        },
        "class": {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                if (b.unnamed >= 1 && b.unnamed <= 11) {
                    return true
                }
                return false
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_classes[h] && g_classes[h][f]) {
                    var c = g_classes[h];
                    return (!b.icon ? '<img src="' + g_staticUrl + "/images/icons/tiny/" + g_classes.getIcon(h) + '.gif" ' + Markup._addGlobalAttributes(b) + ' align="absmiddle" /> ' : "") + '<span class="tinyicontxt">' + Markup._safeHtml(c[f]) + "</span></a>"
                }
                return "(" + LANG.types[13][0] + " #" + h + ")"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_classes[f] && g_classes[f][c]) {
                    return Markup._safeHtml(g_classes[f][c])
                }
                return LANG.types[13][0] + " #" + f
            }
        },
        card: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var j = b.unnamed;
                var h = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var e = h[0];
                var f = h[1];
                if (g_hearthstone_cards && g_hearthstone_cards[j] && g_hearthstone_cards[j][f]) {
                    var c = g_hearthstone_cards[j];
                    var g = "<a" + Markup._addGlobalAttributes(b) + ' href="' + e + "/card=" + j + "/" + g_urlize(c[f]) + '" class="q' + c.quality + (!b.icon ? ' icontiny"><img src="' + g_staticUrl + "/images/icons/tiny/" + c.icon.toLowerCase() + '.png"' : "") + ' align="absmiddle" /> <span class="tinyicontxt">';
                    g += Markup._safeHtml(c[f]) + "</span></a>";
                    return g
                }
                return '<a href="' + e + "?card=" + j + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[220][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var c = e[1];
                if (g_hearthstone_cards && g_hearthstone_cards[f] && g_hearthstone_cards[f][c]) {
                    return Markup._safeHtml(g_hearthstone_cards[f][c])
                }
                return LANG.types[220][0] + " #" + f
            }
        },
        code: {
            block: true,
            empty: false,
            rtrim: true,
            itrim: true,
            helpText: true,
            allowedChildren: {
                "<text>": 1
            },
            toHtml: function (b) {
                var c = '<pre class="code';
                if (b.first) {
                    c += " first"
                }
                if (b.last) {
                    c += " last"
                }
                c += '"' + Markup._addGlobalAttributes(b) + ">";
                return [c, "</pre>"]
            }
        },
        color: {
            empty: false,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^.*/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            extraColors: {
                deathknight: "c6",
                dk: "c6",
                druid: "c11",
                hunter: "c3",
                mage: "c8",
                monk: "c10",
                paladin: "c2",
                priest: "c5",
                rogue: "c4",
                shaman: "c7",
                warlock: "c9",
                warrior: "c1",
                poor: "q0",
                common: "q1",
                uncommon: "q2",
                rare: "q3",
                epic: "q4",
                legendary: "q5",
                artifact: "q6",
                heirloom: "q7"
            },
            toHtml: function (b) {
                var e = /^(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|c\d+|r\d+|q\d*?|#[a-f0-9]{6})$/i;
                var f = "<span ";
                if (b.unnamed.match(e)) {
                    if (b.unnamed == "#00C0FF") {
                        f += 'class="blizzard-blue"' + Markup._addGlobalAttributes(b)
                    } else {
                        var c = b.unnamed.charAt(0);
                        f += ((c == "q" || c == "c" || (c == "r" && b.unnamed != "red")) ? 'class="' : 'style="color: ') + b.unnamed + '"' + Markup._addGlobalAttributes(b)
                    }
                } else {
                    if (Markup.tags.color.extraColors[b.unnamed]) {
                        f += 'class = "' + Markup.tags.color.extraColors[b.unnamed] + '"'
                    }
                }
                f += ">";
                return [f, "</span>"]
            }
        },
        currency: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                amount: {
                    req: false,
                    valid: /^[0-9\:]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var c = g[0];
                var e = g[1];
                if (g_gatheredcurrencies[h] && g_gatheredcurrencies[h][e]) {
                    var f = g_gatheredcurrencies[h];
                    if (b.amount) {
                        return '<a href="' + c + "?currency=" + h + '"' + (!b.icon ? ' class="icontinyr tip q1" onmouseover="Tooltip.showAtCursor(event, \'' + Markup._safeHtml(f[e]) + '\', 0, 0, \'q1\');" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()" style="background-image:url(' + g_staticUrl + "/images/icons/tiny/" + f.icon.toLowerCase() + ".png)" : "") + Markup._addGlobalAttributes(b) + '"> <span class="tinyicontxt">' + b.amount.split(":").join(" - ") + "</span></a>"
                    } else {
                        return '<a href="' + c + "?currency=" + h + '"' + (!b.icon ? ' class="icontiny-markup q1"><span><img src="' + g_staticUrl + "/images/icons/tiny/" + f.icon.toLowerCase() + '.png"' : "") + Markup._addGlobalAttributes(b) + ' align="absmiddle" /> <span class="tinyicontxt">' + Markup._safeHtml(f[e]) + "</a>"
                    }
                }
                return '<a href="' + c + "?currency=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[17][0] + " #" + h + ")</a>" + (b.amount > 0 ? " x" + b.amount : "")
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_gatheredcurrencies[f] && g_gatheredcurrencies[f][c]) {
                    return Markup._safeHtml(g_gatheredcurrencies[f][c])
                }
                return LANG.types[17][0] + " #" + f
            }
        },
        db: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^(live|ptr|beta|wod|mop)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                if (b.unnamed == "live") {
                    Markup.defaultSource = Markup.SOURCE_LIVE
                } else {
                    if (b.unnamed == "ptr") {
                        Markup.defaultSource = Markup.SOURCE_PTR
                    } else {
                        if (b.unnamed == "beta" || b.unnamed == "mop" || b.unnamed == "wod") {
                            Markup.defaultSource = Markup.SOURCE_BETA
                        }
                    }
                }
                return ""
            },
            toText: function (b) {
                if (b.unnamed == "live") {
                    Markup.defaultSource = Markup.SOURCE_LIVE
                } else {
                    if (b.unnamed == "ptr") {
                        Markup.defaultSource = Markup.SOURCE_PTR
                    } else {
                        if (b.unnamed == "beta" || b.unnamed == "mop" || b.unnamed == "wod") {
                            Markup.defaultSource = Markup.SOURCE_BETA
                        }
                    }
                }
                return ""
            }
        },
        del: {
            empty: false,
            attr: {
                copy: {
                    req: false,
                    valid: /^true$/
                }
            },
            toHtml: function (b) {
                var c = '<del class="diffmod"' + Markup._addGlobalAttributes(b);
                if (!b.copy) {
                    c += ' unselectable="on"'
                }
                c += ">";
                return [c, "</del>"]
            }
        },
        div: {
            empty: false,
            block: true,
            ltrim: true,
            rtrim: true,
            itrim: true,
            attr: {
                clear: {
                    req: false,
                    valid: /^(left|right|both)$/i
                },
                unnamed: {
                    req: false,
                    valid: /^hidden$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                align: {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                margin: {
                    req: false,
                    valid: /^\d+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var f = "<div" + Markup._addGlobalAttributes(b);
                var c = [];
                var e = [];
                if (b.clear) {
                    c.push("clear: " + b.clear)
                }
                if (b.unnamed) {
                    c.push("display: none")
                }
                if (b.width) {
                    c.push("width: " + b.width)
                }
                if (b["float"]) {
                    c.push("float: " + b["float"]);
                    if (b.margin === undefined) {
                        if (b["float"] == "left") {
                            c.push("margin: 0 10px 10px 0")
                        } else {
                            c.push("margin: 0 0 10px 10px")
                        }
                    }
                }
                if (b.align) {
                    c.push("text-align: " + b.align)
                }
                if (b.margin) {
                    c.push("margin: " + b.margin)
                }
                if (b.first) {
                    e.push("first")
                }
                if (b.last) {
                    e.push("last")
                }
                if (c.length > 0) {
                    f += ' style="' + c.join(";") + '"'
                }
                if (e.length > 0) {
                    f += ' class="' + e.join(" ") + '"'
                }
                f += ">";
                return [f, "</div>"]
            },
            fromHtml: function (g, f) {
                f = f || 0;
                var b;
                if (b = Markup.matchOuterTags(g, "<div\\b[\\s\\S]*?>", "</div>", "g")) {
                    for (var c = 0; c < b.length; ++c) {
                        var h = b[c][1].match(/float:\s*(left|right)"/i),
                            e = b[c][1].match(/width[:="]+\s*([0-9]+)/i);
                        g = g.replace(b[c][1] + b[c][0] + b[c][2], "\n" + Array(f + 1).join("\t") + "[div" + (h ? " float=" + h[1] : "") + (e ? " width=" + e[1] : "") + "]" + Markup.tags.div.fromHtml(b[c][0], f + 1) + "[/div]")
                    }
                }
                return g
            }
        },
        event: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_holidays[h] && g_holidays[h][f]) {
                    var c = g_holidays[h];
                    return '<a href="' + e + "?event=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(c[f]) + "</a>"
                }
                return '<a href="' + e + "?event=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[12][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_holidays[f] && g_holidays[f][c]) {
                    return Markup._safeHtml(g_holidays[f][c])
                }
                return LANG.types[12][0] + " #" + f
            }
        },
        faction: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var c = g[0];
                var e = g[1];
                if (g_factions[h] && g_factions[h][e]) {
                    var f = g_factions[h];
                    return '<a href="' + c + "?faction=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(f[e]) + "</a>"
                }
                return '<a href="' + c + "?faction=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[8][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_factions[f] && g_factions[f][c]) {
                    return Markup._safeHtml(g_factions[f][c])
                }
                return LANG.types[8][0] + " #" + f
            }
        },
        feedback: {
            empty: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                mailto: {
                    req: false,
                    valid: /^true$/i
                }
            },
            toHtml: function (b) {
                return '<b><span class="icontiny" style="background-image: url(' + g_staticUrl + "/images/icons" + MarkupIconPath + '/email.gif)"><a href="' + (b.mailto ? "mailto:feedback@wowhead.com" : 'javascript:;" onclick="ContactTool.show();') + '">feedback@wowhead.com</a></span></b>'
            }
        },
        follower: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var c = g[0];
                var e = g[1];
                if (g_followers[h] && g_followers[h][e]) {
                    var f = g_followers[h];
                    return '<a href="' + c + "?follower=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(f[e]) + "</a>"
                }
                return '<a href="' + c + "?follower=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[21][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_followers[f] && g_followers[f][c]) {
                    return Markup._safeHtml(g_followers[f][c])
                }
                return LANG.types[21][0] + " #" + f
            }
        },
        forumrules: {
            empty: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                return '<b><span class="icontiny" style="background-image: url(' + g_staticUrl + "/images/icons" + MarkupIconPath + '/favicon.gif)"><a href="http://www.wowhead.com/forums&topic=2">forum rules</a></span></b>'
            }
        },
        hr: {
            empty: true,
            trim: true,
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            toHtml: function (b) {
                return "<hr />"
            },
            fromHtml: function (b) {
                return b.replace(/<hr\b[\s\S]*?>/gi, "[hr]")
            }
        },
        h2: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^first$/i
                },
                clear: {
                    req: false,
                    valid: /^(true|both|left|right)$/i
                },
                toc: {
                    req: false,
                    valid: /^false$/i
                }
            },
            toHtml: function (b) {
                if (!b.id) {
                    b.id = g_urlize(b._textContents)
                }
                str = "<h2" + Markup._addGlobalAttributes(b);
                var c = [];
                if (b.first || b.unnamed) {
                    c.push("first")
                }
                if (b.last) {
                    c.push("last")
                }
                if (c.length > 0) {
                    str += ' class="' + c.join(" ") + '"'
                }
                if (b.clear) {
                    if (b.clear == "true" || b.clear == "both") {
                        str += ' style="clear: both"'
                    } else {
                        str += ' style="clear: ' + b.clear + '"'
                    }
                }
                return [str + ">", "</h2>"]
            },
            fromHtml: function (b) {
                return b.replace(/<h2\b[\s\S]*?>([\s\S]*?)<\/h2>/gi, "\n[h2]$1[/h2]")
            }
        },
        h3: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^first$/i
                },
                toc: {
                    req: false,
                    valid: /^false$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                if (!b.id) {
                    b.id = g_urlize(b._textContents)
                }
                var e = "<h4" + Markup._addGlobalAttributes(b);
                var c = [];
                if (b.first || b.unnamed) {
                    c.push("first")
                }
                if (b.last) {
                    c.push("last")
                }
                if (c.length > 0) {
                    e += ' class="' + c.join(" ") + '"'
                }
                return [e + ">", "</h3>"]
            },
            fromHtml: function (b) {
                return b.replace(/<h4\b[\s\S]*?>([\s\S]*?)<\/h3>/gi, "\n[h4]$1[/h4]")
            }
        },
        hsachievement: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (c) {
                var j = c.unnamed;
                var h = Markup._getDatabaseDomainInfo(c, "hearthhead.com");
                var e = h[0];
                var f = h[1];
                if (g_hearthstone_achievements && g_hearthstone_achievements[j] && g_hearthstone_achievements[j][f]) {
                    var b = g_hearthstone_achievements[j];
                    var g = "<a" + Markup._addGlobalAttributes(c) + ' href="' + e + "/achievement=" + j + "/" + g_urlize(b[f]) + '"><span class="tinyicontxt">';
                    g += Markup._safeHtml(b[f]) + "</span></a>";
                    return g
                }
                return '<a href="' + e + "?achievement=" + j + '"' + Markup._addGlobalAttributes(c) + ">(" + LANG.types[222][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var c = e[1];
                if (g_hearthstone_cards && g_hearthstone_achievements[f] && g_hearthstone_achievements[f][c]) {
                    return Markup._safeHtml(g_hearthstone_achievements[f][c])
                }
                return LANG.types[222][0] + " #" + f
            }
        },
        hsquest: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var j = b.unnamed;
                var h = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var e = h[0];
                var f = h[1];
                if (g_hearthstone_quests && g_hearthstone_quests[j] && g_hearthstone_quests[j][f]) {
                    var c = g_hearthstone_quests[j];
                    var g = "<a" + Markup._addGlobalAttributes(b) + ' href="' + e + "?quest=" + j + "/" + g_urlize(c[f]) + '"><span class="tinyicontxt">';
                    g += Markup._safeHtml(c[f]) + "</span></a>";
                    return g
                }
                return '<a href="' + e + "?quest=" + j + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[223][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var c = e[1];
                if (g_hearthstone_cards && g_hearthstone_quests[f] && g_hearthstone_quests[f][c]) {
                    return Markup._safeHtml(g_hearthstone_quests[f][c])
                }
                return LANG.types[223][0] + " #" + f
            }
        },
        html: {
            empty: false,
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (b) {
                return [b._contents]
            }
        },
        i: {
            empty: false,
            allowInReplies: true,
            toHtml: function (b) {
                return ["<i" + Markup._addGlobalAttributes(b) + ">", "</i>"]
            },
            fromHtml: function (b) {
                return b.replace(/<(i|em)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[i]$2[/i]")
            }
        },
        icon: {
            empty: false,
            itrim: true,
            attr: {
                align: {
                    req: false,
                    valid: /^right$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                name: {
                    req: false,
                    valid: /\S+/
                },
                size: {
                    req: false,
                    valid: /^(tiny|small|medium|large)$/
                },
                unnamed: {
                    req: false,
                    valid: /^class$/i
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                preset: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            presets: {
                boss: g_staticUrl + "/images/icons" + MarkupIconPath + "/boss.gif",
                heroic: g_staticUrl + "/images/icons" + MarkupIconPath + "/heroic.gif"
            },
            validate: function (b) {
                if (!b.name && !b.url && !b.preset) {
                    return false
                }
                if (b.preset && !Markup.tags.icon.presets[b.preset]) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var e = (b.size ? b.size : "tiny");
                if (!b.name) {
                    b.name = ""
                }
                if (e == "tiny") {
                    var h = "<span" + Markup._addGlobalAttributes(b) + ' class="';
                    if (b.unnamed == undefined) {
                        h += "icontiny";
                        if (b.align) {
                            h += "r"
                        }
                        var g = "";
                        if (b.name) {
                            if (b.name.toLowerCase() == "side_horde")
                                g = "templates/wowhead/images/horde.png";
                            else if (b.name.toLowerCase() == "side_alliance")
                                g = "templates/wowhead/images/alliance.png";
                            else
                                g = g_staticUrl + "/images/icons/tiny/" + b.name.toLowerCase() + ".png";
                        } else {
                            if (b.preset) {
                                g = Markup.tags.icon.presets[b.preset]
                            } else {
                                if (b.url && Markup._isUrlSafe(b.url)) {
                                    g = b.url
                                } else {
                                    return ""
                                }
                            }
                        }
                        h += '" style="background-image: url(' + g + ')">'
                    } else {
                        h += b.name + '">'
                    }
                    return [h, "</span>"]
                } else {
                    var h = "<div" + Markup._addGlobalAttributes(b) + ' onclick="Icon.showIconName(this)" class="icon' + e + (b["float"] ? '" style="float: ' + b["float"] + ';">' : '">');
                    var f = {
                        small: 0,
                        medium: 1,
                        large: 2
                    };
                    var c = null;
                    if (b.url && Markup._isUrlSafe(b.url)) {
                        c = b.url
                    } else {
                        if (b._textContents && Markup._isUrlSafe(b._textContents)) {
                            c = b._textContents
                        }
                    }
                    icon = Icon.create(b.name.toLowerCase(), f[e], null, c);
                    h += icon.innerHTML + "</div>";
                    return [h]
                }
            }
        },
        iconlist: {
            empty: false,
            block: true,
            ltrim: true,
            rtrim: true,
            attr: {
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                b: 1,
                achievement: 1,
                currency: 1,
                faction: 1,
                holiday: 1,
                item: 1,
                itemset: 1,
                npc: 1,
                object: 1,
                pet: 1,
                quest: 1,
                spell: 1,
                title: 1,
                zone: 1
            },
            toHtml: function (j) {
                var f = Markup._getDatabaseDomainInfo(j)[2];
                var l = "",
                    c;
                for (var g = 0; g < j._nodes.length; ++g) {
                    var e = dO(j._nodes[g]);
                    e.attr.domain = f;
                    var h = Markup.tags[e.name].toHtml(e.attr),
                        k = e.name,
                        b = "",
                        n = "";
                    if (typeof h != "string") {
                        h = h[0] + e.attr._contents + h[1]
                    } else {
                        if (typeof h == "string" && (c = h.match(/href="(.+?)".+?url\(\/images\/wow\/icons\/tiny\/(.+?)(\.png|\.gif)\)/))) {
                            e.attr.icon = "false";
                            h = Markup.tags[e.name].toHtml(e.attr);
                            b = c[1];
                            n = c[2]
                        }
                    } if (h) {
                        l += "<tr><th>" + (n ? Markup.toHtml("[icon name=" + n + " size=small url=" + b + "]", {
                            skipReset: true
                        }) : "<ul><li>&nbsp;</li></ul>") + "</th><td>" + h + "</td></tr>"
                    }
                }
                if (l) {
                    l = '<div class="iconlist-col"><table class="iconlist">' + l + "</table></div>"
                }
                return [l]
            }
        },
        img: {
            empty: true,
            attr: {
                src: {
                    req: false,
                    valid: /\S+/
                },
                icon: {
                    req: false,
                    valid: /\S+/
                },
                id: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                blog: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                size: {
                    req: false,
                    valid: /^(thumb|resized|normal|large|medium|small|tiny)$/i
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                margin: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            blogSize: /^(thumb|normal)$/i,
            idSize: /^(thumb|resized|normal)$/i,
            iconSize: /^(large|medium|small|tiny)$/i,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (b) {
                if (b.src) {
                    return true
                } else {
                    if (b.id) {
                        return (b.size ? Markup.tags.img.idSize.test(b.size) : true)
                    } else {
                        if (b.icon) {
                            return (b.size ? Markup.tags.img.iconSize.test(b.size) : true)
                        } else {
                            if (b.blog) {
                                return (b.size ? Markup.tags.img.blogSize.test(b.size) : true)
                            }
                        }
                    }
                }
                return false
            },
            toHtml: function (b) {
                var g = "<img" + Markup._addGlobalAttributes(b);
                var f = "";
                if (b.src) {
                    g += ' src="' + b.src + '"'
                } else {
                    if (b.id) {
                        g += ' src="' + g_staticUrl + "/uploads/screenshots/" + (b.size ? b.size : "normal") + "/" + b.id + '.jpg"'
                    } else {
                        if (b.icon) {
                            g += ' src="' + g_staticUrl + "/images/icons/" + (b.size ? b.size : "large") + "/" + b.icon + '.jpg"'
                        } else {
                            if (b.blog) {
                                if (g_blogimages[b.blog]) {
                                    var c = g_blogimages[b.blog];
                                    if (b.size && b.size == "thumb") {
                                        var e = g_staticUrl + "/uploads/blog/images/" + b.blog + (c.type == 3 ? ".png" : ".jpg");
                                        g += ' src="' + g_staticUrl + "/uploads/blog/thumbs/" + b.blog + (c.type == 3 ? ".png" : ".jpg") + '" alt="' + Markup._safeHtml(c.alt) + '" width="' + c.thumbwidth + '" height="' + c.thumbheight + '"';
                                        if (!g_screenshots[Markup.uid]) {
                                            g_screenshots[Markup.uid] = []
                                        }
                                        g = '<a href="' + e + '" onclick="if(!g_isLeftClick(event)) return; ScreenshotViewer.show({screenshots: \'' + Markup.uid + "', pos: " + g_screenshots[Markup.uid].length + '}); return false;">' + g;
                                        f = "</a>";
                                        var h = {
                                            url: e,
                                            caption: c.alt,
                                            width: c.width,
                                            height: c.height,
                                            noMarkup: true
                                        };
                                        g_screenshots[Markup.uid].push(h)
                                    } else {
                                        g += ' src="' + g_staticUrl + "/uploads/blog/images/" + b.blog + (c.type == 3 ? ".png" : ".jpg") + '" alt="' + Markup._safeHtml(c.alt) + '" width="' + c.width + '" height="' + c.height + '"'
                                    }
                                } else {
                                    return ("Image #" + b.blog)
                                }
                            }
                        }
                    }
                } if (b.width) {
                    g += ' width="' + b.width + '"'
                }
                if (b.height) {
                    g += ' height="' + b.height + '"'
                }
                if (b["float"]) {
                    if (b["float"] == "center") {
                        g = '<div style="text-align: center">' + g + ' style="margin: 10px auto"';
                        f = "</div>"
                    } else {
                        g += ' style="float: ' + b["float"] + ";";
                        if (!b.margin) {
                            b.margin = 10
                        }
                        if (b["float"] == "left") {
                            g += " margin: 0 " + b.margin + "px " + b.margin + 'px 0"'
                        } else {
                            g += " margin: 0 0 " + b.margin + "px " + b.margin + 'px"'
                        }
                    }
                }
                if (b.border != 0) {
                    g += ' class="border"'
                }
                if (b.title) {
                    g += ' alt="' + b.title + '"'
                } else {
                    g += ' alt=""'
                }
                g += " />" + f;
                return g
            },
            fromHtml: function (j) {
                var c;
                if (c = j.match(/<img\b[\s\S]*?src="[\s\S]+?"[\s\S]*?>/gi)) {
                    for (var f = 0; f < c.length; ++f) {
                        var b = c[f].match(/src="([\s\S]+?)"/i),
                            g = c[f].match(/width[:="]+\s*([0-9]+)/i),
                            h = c[f].match(/height[:="]+\s*([0-9]+)/i),
                            e = c[f].match(/border[:="]+\s*([0-9]+)/i);
                        j = j.replace(c[f], "[img src=" + b[1] + (g ? " width=" + g[1] : "") + (h ? " height=" + h[1] : "") + " border=" + (e ? e[1] : 0) + "]")
                    }
                }
                return j
            }
        },
        ins: {
            empty: false,
            toHtml: function (b) {
                return ['<ins class="diffmod"' + Markup._addGlobalAttributes(b) + ">", "</ins>"]
            }
        },
        item: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var j = b.unnamed;
                var h = Markup._getDatabaseDomainInfo(b);
                var c = h[0];
                var e = h[1];
                if (g_items[j] && g_items[j][e]) {
                    var f = g_items[j];
                    var g = "<a" + Markup._addGlobalAttributes(b) + ' href="' + c + "?item=" + j + '" class="q' + f.quality + (!b.icon ? ' iconsmall"><img src="' + g_staticUrl + "/images/icons/tiny/" + f.icon.toLowerCase() + '.png"' : "") + ' align="absmiddle" /> <span class="tinyicontxt">';
                    g += Markup._safeHtml(f[e]) + "</span></a>";
                    return g
                }
                return '<a href="' + c + "?item=" + j + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[3][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_items[f] && g_items[f][c]) {
                    return Markup._safeHtml(g_items[f][c])
                }
                return LANG.types[3][0] + " #" + f
            }
        },
        itemset: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^-?[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_itemsets[h] && g_itemsets[h][e]) {
                    var g = g_itemsets[h];
                    return '<a href="' + c + "?itemset=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(g[e]) + "</a>"
                }
                return '<a href="' + c + "?itemset=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[4][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_itemsets[f] && g_itemsets[f][c]) {
                    return Markup._safeHtml(g_itemsets[f][c])
                }
                return LANG.types[4][0] + " #" + f
            }
        },
        "pet-ability": {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^-?[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var j = b.unnamed;
                var h = Markup._getDatabaseDomainInfo(b);
                var c = h[0];
                var e = h[1];
                if (g_petabilities[j] && g_petabilities[j][e]) {
                    var f = g_petabilities[j];
                    var g = "<a" + Markup._addGlobalAttributes(b) + ' href="' + c + "?pet-ability=" + j + '" class="q' + f.quality + (!b.icon ? ' iconsmall"><img src="' + g_staticUrl + "/images/icons/tiny/" + f.icon.toLowerCase() + '.png"' : "") + ' align="absmiddle" /> <span class="tinyicontxt">';
                    g += Markup._safeHtml(f[e]) + "</span></a>";
                    return g
                }
                return '<a href="' + c + "?pet-ability=" + j + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[200][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_petabilities[f] && g_petabilities[f][c]) {
                    return Markup._safeHtml(g_petabilities[f][c])
                }
                return LANG.types[200][0] + " #" + f
            }
        },
        li: {
            empty: false,
            itrim: true,
            allowedParents: {
                ul: 1,
                ol: 1
            },
            helpText: function () {
                var c = "";
                c += "[ul]";
                for (var b = 0; b < 3; ++b) {
                    c += "\n[li]" + LANG.markup_li + "[/li]"
                }
                c += "\n[/ul]\n\n";
                c += "[ol]";
                for (var b = 0; b < 3; ++b) {
                    c += "\n[li]" + LANG.markup_li + "[/li]"
                }
                c += "\n[/ol]\n";
                return c.toLowerCase()
            },
            toHtml: function (b) {
                return ["<li" + Markup._addGlobalAttributes(b) + "><div>", "</div></li>"]
            },
            fromHtml: function (f, e) {
                e = e || 0;
                var b;
                if (b = Markup.matchOuterTags(f, "<li\\b[\\s\\S]*?>", "</li>", "g")) {
                    for (var c = 0; c < b.length; ++c) {
                        f = f.replace(b[c][1] + b[c][0] + b[c][2], "\n\t" + Array(e + 1).join("\t") + "[li]" + Markup.tags.li.fromHtml(b[c][0], e + 1) + "[/li]")
                    }
                }
                return f
            }
        },
        lightbox: {
            empty: false,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^(map|model|screenshot)$/
                },
                zone: {
                    req: false,
                    valid: /^-?[0-9]+[a-z]?$/i
                },
                floor: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                pins: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            validate: function (b) {
                switch (b.unnamed) {
                case "map":
                    if (b.zone) {
                        return true
                    }
                    break;
                case "model":
                    break;
                case "screenshot":
                    break
                }
                return false
            },
            toHtml: function (b) {
                var c = "";
                var e = "";
                switch (b.unnamed) {
                case "map":
                    c = "/maps=" + b.zone;
                    if (b.floor) {
                        c += "." + b.floor
                    }
                    if (b.pins) {
                        c += ":" + b.pins
                    }
                    var f = c.substr(6);
                    e = "if(!g_isLeftClick(event)) return; MapViewer.show({ link: '" + f + "' }); return false;";
                    break
                }
                if (c && e) {
                    return ['<a href="' + c + '" onclick="' + e + '"' + Markup._addGlobalAttributes(b) + ">", "</a>"]
                }
                return ""
            }
        },
        map: {
            empty: false,
            attr: {
                zone: {
                    req: true,
                    valid: /^-?[0-9a-z\-_]+$/i
                },
                source: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                pin: 1
            },
            toHtml: function (c) {
                var b = c._contents;
                c.id = "dsgdfngjkfdg" + (Markup.maps.length);
                var e = "<div" + Markup._addGlobalAttributes(c) + '></div><div style="clear: left"></div>';
                Markup.maps.push([c.id, c.zone, b]);
                return [e]
            }
        },
        mechanic: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (c) {
                var j = c.unnamed;
                var h = Markup._getDatabaseDomainInfo(c, "hearthhead.com");
                var e = h[0];
                var f = h[1];
                if (g_hearthstone_mechanics && g_hearthstone_mechanics[j] && g_hearthstone_mechanics[j][f]) {
                    var b = g_hearthstone_mechanics[j];
                    var g = "<a" + Markup._addGlobalAttributes(c) + ' href="' + e + "/mechanic=" + j + "/" + g_urlize(b[f]) + '" class="q1' + (!c.icon ? ' icontiny"><img src="' + g_staticUrl + "/images/icons/tiny/" + b.icon.toLowerCase() + '.png"' : "") + ' align="absmiddle" /> <span class="tinyicontxt">';
                    g += Markup._safeHtml(b[f]) + "</span></a>";
                    return g
                }
                return '<a href="' + e + "?mechanic=" + j + '"' + Markup._addGlobalAttributes(c) + ">(" + LANG.types[221][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b, "hearthhead.com");
                var c = e[1];
                if (g_hearthstone_cards && g_hearthstone_mechanics[f] && g_hearthstone_mechanics[f][c]) {
                    return Markup._safeHtml(g_hearthstone_mechanics[f][c])
                }
                return LANG.types[221][0] + " #" + f
            }
        },
        n5: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9\.]+$/
                }
            },
            toHtml: function (b) {
                return GetN5(b.unnamed)
            }
        },
        pin: {
            empty: false,
            attr: {
                url: {
                    req: false,
                    valid: /\S+/
                },
                type: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                x: {
                    req: true,
                    valid: /^[0-9]{1,2}(\.[0-9])?$/
                },
                y: {
                    req: true,
                    valid: /^[0-9]{1,2}(\.[0-9])?$/
                },
                path: {
                    req: false,
                    valid: /^([0-9]{1,2}(\.[0-9])?[,:]?)+$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedParents: {
                map: 1
            },
            toHtml: function (e) {
                if (e.url && !Markup._isUrlSafe(e.url)) {
                    e.url = ""
                }
                var g = e._contents;
                if (e.url && e.url.indexOf("npc=") != -1) {
                    g = '<b class="q">' + g + '</b><br /><span class="q2">Click to view this NPC</span>'
                }
                if (e.url && (e.url.indexOf("/") < 0) && (e.url.indexOf("=") >= 0)) {
                    e.url = "/" + e.url
                }
                var f = null;
                if (e.path) {
                    var c = e.path.split(":"),
                        f = [];
                    for (var h = 0, b = c.length; h < b; ++h) {
                        var j = c[h].split(",");
                        if (j.length == 2) {
                            f.push([parseFloat(j[0] || 0), parseFloat(j[1] || 0)])
                        }
                    }
                }
                return [
                    [parseFloat(e.x || 0), parseFloat(e.y || 0), {
                        label: g,
                        url: e.url,
                        type: e.type,
                        lines: f
                    }]
                ]
            }
        },
        markupdoc: {
            empty: true,
            attr: {
                tag: {
                    req: false,
                    valid: /[a-z0-9]+/i
                },
                help: {
                    req: false,
                    valid: /^(admin|staff|premium|user|pending)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (b) {
                if (b.tag && !Markup.tags[b.tag]) {
                    return false
                }
                return true
            },
            toHtml: function (e) {
                var f = "",
                    c = (e.help ? Markup["CLASS_" + e.help.toUpperCase()] : false);
                if (c) {
                    f += LANG.markup_helpdoc + '<div class="pad3"></div><table class="comment comment-markupdoc"><tr><th>' + LANG.markup_help1 + "</th><th>" + LANG.markup_help2 + "</th></tr>"
                }
                if (e.tag) {
                    f = Markup._generateTagDocs(e.tag, c)
                } else {
                    for (var b in Markup.tags) {
                        if (!c && f != "") {
                            f += '<div class="pad3"></div>'
                        }
                        f += Markup._generateTagDocs(b, c)
                    }
                }
                return f + (c ? "</table>" : "")
            }
        },
        menu: {
            empty: true,
            trim: true,
            ltrim: true,
            rtrim: true,
            attr: {
                tab: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                path: {
                    req: true,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = b.path.split(",");
                PageTemplate.set({
                    activeTab: b.tab,
                    breadcrumb: c
                })
            }
        },
        minibox: {
            empty: false,
            rtrim: true,
            itrim: true,
            attr: {
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = "<div" + Markup._addGlobalAttributes(b) + ' class="minibox';
                if (b["float"] == "left") {
                    c += " minibox-left"
                }
                c += '">';
                return [c, "</div>"]
            }
        },
        model: {
            empty: false,
            attr: {
                item: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                object: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                npc: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                itemset: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                slot: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                humanoid: {
                    req: false,
                    valid: /^1$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                img: {
                    req: false,
                    valid: /\S+/
                },
                link: {
                    req: false,
                    valid: /\S+/
                },
                label: {
                    req: false,
                    valid: /[\S ]+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            skipSlots: {
                4: 1,
                5: 1,
                6: 1,
                7: 1,
                8: 1,
                9: 1,
                10: 1,
                16: 1,
                19: 1,
                20: 1
            },
            toHtml: function (b) {
                var c = "";
                if (b.npc) {
                    c = "<a" + Markup._addGlobalAttributes(b) + ' href="#modelviewer:1:' + b.npc + ":" + (b.humanoid ? "1" : "0") + '" onclick="ModelViewer.show({ type: 1, displayId: ' + b.npc + ", slot: " + b.slot + ", " + (b.humanoid ? "humanoid: 1, " : "") + "displayAd: 1, fromTag: 1" + (b.link ? ", link: '" + Markup._safeJsString(b.link) + "'" : "") + (b.label ? ", label: '" + Markup._safeJsString(b.label) + "'" : "") + ' });"><img alt="' + Markup._safeHtml(b._contents) + '" title="' + Markup._safeHtml(b._contents) + '" src="' + (b.img ? b.img : g_staticUrl + "/modelviewer/thumbs/npc/" + b.npc + '.png" width="150" height="150') + '" class="border" ';
                    if (b["float"]) {
                        c += 'style="float: ' + b["float"] + "; ";
                        if (b["float"] == "left") {
                            c += 'margin: 0 10px 10px 0" '
                        } else {
                            c += 'margin: 0 0 10px 10px" '
                        }
                    }
                    c += "/></a>";
                    return [c]
                } else {
                    if (b.object) {
                        c = "<a" + Markup._addGlobalAttributes(b) + ' href="#modelviewer:2:' + b.object + '" onclick="ModelViewer.show({ type: 2, displayId: ' + b.object + ", displayAd: 1, fromTag: 1" + (b.link ? ", link: '" + Markup._safeJsString(b.link) + "'" : "") + (b.label ? ", label: '" + Markup._safeJsString(b.label) + "'" : "") + ' });"><img alt="' + Markup._safeHtml(b._contents) + '" title="' + Markup._safeHtml(b._contents) + '" src="' + (b.img ? b.img : g_staticUrl + "/modelviewer/thumbs/obj/" + b.object + '.png" width="150" height="150') + '" class="border" ';
                        if (b["float"]) {
                            c += 'style="float: ' + b["float"] + "; ";
                            if (b["float"] == "left") {
                                c += 'margin: 0 10px 10px 0" '
                            } else {
                                c += 'margin: 0 0 10px 10px" '
                            }
                        }
                        c += "/></a>";
                        return [c]
                    } else {
                        if (b.item && b.slot) {
                            c = "<a" + Markup._addGlobalAttributes(b) + ' href="#modelviewer:3:' + b.item + ":" + b.slot + '" onclick="ModelViewer.show({ type: 3, displayId: ' + b.item + ", slot: " + b.slot + ", displayAd: 1, fromTag: 1" + (b.link ? ", link: '" + Markup._safeJsString(b.link) + "'" : "") + (b.label ? ", label: '" + Markup._safeJsString(b.label) + "'" : "") + ' });"><img alt="' + Markup._safeHtml(b._contents) + '" title="' + Markup._safeHtml(b._contents) + '" src="' + (b.img ? b.img : g_staticUrl + "/modelviewer/thumbs/item/" + b.item + '.png" width="150" height="150') + '" class="border" ';
                            if (b["float"]) {
                                c += 'style="float: ' + b["float"] + "; ";
                                if (b["float"] == "left") {
                                    c += 'margin: 0 10px 10px 0" '
                                } else {
                                    c += 'margin: 0 0 10px 10px" '
                                }
                            }
                            c += "/></a>";
                            return [c]
                        } else {
                            if (b.itemset) {
                                c = "<a" + Markup._addGlobalAttributes(b) + ' href="javascript:;" onclick="ModelViewer.show({ type: 4, equipList: [' + b.itemset + "], displayAd: 1, fromTag: 1" + (b.link ? ", link: '" + Markup._safeJsString(b.link) + "'" : "") + (b.label ? ", label: '" + Markup._safeJsString(b.label) + "'" : "") + ' });">'
                            } else {
                                return ["[model]", "[/model]"]
                            }
                        }
                    }
                }
                return [c, "</a>"]
            }
        },
        money: {
            empty: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                side: {
                    req: false,
                    valid: /^(alliance|horde|both)$/i
                },
                items: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                currency: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                achievement: {
                    req: false,
                    valid: /\S+/
                },
                arena: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                honor: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                conquest: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                justice: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                valor: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var e = [],
                    c = [];
                if (b.items) {
                    var g = b.items.split(",");
                    if (g.length >= 2) {
                        for (var f = 0; f < g.length - 1; f += 2) {
                            e.push([g[f], g[f + 1]])
                        }
                    }
                }
                if (b.currency) {
                    var g = b.currency.split(",");
                    if (g.length >= 2) {
                        for (var f = 0; f < g.length - 1; f += 2) {
                            c.push([g[f], g[f + 1]])
                        }
                    }
                }
                if (b.arena && !b.conquest) {
                    b.conquest = b.arena
                }
                if (b.honor) {
                    c.push([392, b.honor])
                }
                if (b.conquest) {
                    c.push([390, b.conquest])
                }
                if (b.justice) {
                    c.push([395, b.justice])
                }
                if (b.valor) {
                    c.push([396, b.valor])
                }
                return g_getMoneyHtml(b.unnamed, b.side, e, c, b.achievement)
            }
        },
        npc: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(mop-shoot|cata-shoot|shoot|beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_npcs[h] && g_npcs[h][f]) {
                    var c = g_npcs[h];
                    return '<a href="' + e + "?npc=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(c[f]) + "</a>"
                }
                return '<a href="' + e + "?npc=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[1][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_npcs[f] && g_npcs[f][c]) {
                    return Markup._safeHtml(g_npcs[f][c])
                }
                return LANG.types[1][0] + " #" + f
            }
        },
        petability: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                diff: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                diffnew: {
                    req: false,
                    valid: /^1$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (c) {
                var j = c.unnamed;
                var h = Markup._getDatabaseDomainInfo(c);
                var e = h[0];
                var f = h[1];
                var b = [];
                if (c.diff) {
                    b.push("diff=" + c.diff)
                }
                if (c.diffnew) {
                    b.push("diffnew=" + c.diffnew)
                }
                if (g_petabilities[j] && g_petabilities[j][f]) {
                    var g = g_petabilities[j];
                    return '<a href="' + e + "?petability=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + '"' + Markup._addGlobalAttributes(c) + (g.icon ? (' class="icontiny"><img src="' + g_staticUrl + "/images/icons/tiny/" + g.icon.toLowerCase() + '.png" align="absmiddle" /') : "") + '> <span class="tinyicontxt">' + Markup._safeHtml(g[f]) + "</span></a>"
                }
                return '<a href="' + e + "?petability=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + '"' + Markup._addGlobalAttributes(c) + ">(" + LANG.types[200][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_petabilities[f] && g_petabilities[f][c]) {
                    return Markup._safeHtml(g_petabilities[f][c])
                }
                return LANG.types[200][0] + " #" + f
            }
        },
        object: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var c = g[0];
                var e = g[1];
                if (g_objects[h] && g_objects[h][e]) {
                    var f = g_objects[h];
                    return '<a href="' + c + "?object=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(f[e]) + "</a>"
                }
                return '<a href="' + c + "?object=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[2][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_objects[f] && g_objects[f][c]) {
                    return Markup._safeHtml(g_objects[f][c])
                }
                return LANG.types[2][0] + " #" + f
            }
        },
        ol: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                li: 1
            },
            toHtml: function (b) {
                var c = "<ol";
                var e = [];
                if (b.first) {
                    e.push("first")
                }
                if (b.last) {
                    e.push("last")
                }
                if (e.length > 0) {
                    c += ' class="' + e.join(" ") + '"'
                }
                c += Markup._addGlobalAttributes(b) + ">";
                return [c, "</ol>"]
            },
            fromHtml: function (f, e) {
                e = e || 0;
                var b;
                if (b = Markup.matchOuterTags(f, "<ol\\b[\\s\\S]*?>", "</ol>", "g")) {
                    for (var c = 0; c < b.length; ++c) {
                        f = f.replace(b[c][1] + b[c][0] + b[c][2], "\n" + Array(e + 1).join("\t") + "[ol]" + Markup.tags.ol.fromHtml(b[c][0], e + 1) + "\n" + Array(e + 1).join("\t") + "[/ol]")
                    }
                }
                return f
            }
        },
        p: {
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                return ['<p style="line-height: 1.4em; margin: 1em 0px 0px 0px;"' + Markup._addGlobalAttributes(b) + ">", "</p>"]
            },
            fromHtml: function (f) {
                var b;
                if (b = f.match(/<p\b[\s\S]*?>[\s\S]*?<\/p>/gi)) {
                    for (var c = 0; c < b.length; ++c) {
                        var g = b[c].match(/^<p\b[\s\S]*?text-align:\s*(center|left|right)/i);
                        var e = b[c].match(/<p\b[\s\S]*?>([\s\S]*?)<\/p>/i);
                        f = f.replace(b[c], "[pad][div" + (g ? " align=" + g[1] : "") + "]" + (e ? e[1] : "") + "[/div][pad]")
                    }
                }
                return f
            }
        },
        pad: {
            empty: true,
            block: true,
            trim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = '<div class="pad';
                if (b.first) {
                    c += " first"
                }
                if (b.last) {
                    c += " last"
                }
                c += '"' + Markup._addGlobalAttributes(b) + "></div>";
                return c
            }
        },
        pet: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var c = g[0];
                var e = g[1];
                if (g_pet_families && g_pet_families[h] && g_pets && g_pets[h]) {
                    var f = "<span" + (!b.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/icons/tiny/" + g_pets[h]["icon"].toLowerCase() + ".png)" : "") + '">';
                    f += '<a href="' + c + "?pet=" + h + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(g_pet_families[h]) + "</a></span>";
                    return f
                }
                return '<a href="' + c + "?pet=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[9][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var c = b.unnamed;
                if (g_pet_families && g_pet_families[c]) {
                    return Markup._safeHtml(g_pet_families[c])
                }
                return LANG.types[9][0] + " #" + c
            }
        },
        pre: {
            empty: false,
            block: true,
            rtrim: true,
            toHtml: function (b) {
                var c = '<pre class="code';
                if (b.first) {
                    c += " first"
                }
                if (b.last) {
                    c += " last"
                }
                c += '"' + Markup._addGlobalAttributes(b) + ">";
                return [c, "</pre>"]
            },
            fromHtml: function (b) {
                return b.replace(/<pre\b[\s\S]*?>([\s\S]*?)<\/pre>/gi, "[pre]$1[/pre]")
            }
        },
        quest: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_quests[h] && g_quests[h][f]) {
                    var c = g_quests[h];
                    return '<a href="' + e + "?quest=" + h + '"' + (!b.icon ? ' class="iconsmall"><img src="' + g_staticUrl + "/images/icons/tiny/" + (c.daily ? "quest_start_daily" : "quest_start") + '.png"' : "") + Markup._addGlobalAttributes(b) + ' align="absmiddle" /> <span class="tinyicontxt">' + Markup._safeHtml(c[f]) + "</span></a>"
                }
                return '<a href="' + e + "?quest=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[5][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_quests[f] && g_quests[f][c]) {
                    return Markup._safeHtml(g_quests[f][c])
                }
                return LANG.types[5][0] + " #" + f
            }
        },
        quote: {
            block: true,
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /[\S ]+/
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                blizzard: {
                    req: false,
                    valid: /^true$/
                },
                pname: {
                    req: false
                },
                wowhead: {
                    req: false,
                    valid: /^true$/
                },
                display: {
                    req: false,
                    valid: /^block$/
                },
                align: {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                collapse: {
                    req: false,
                    valid: /^true$/
                }
            },
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            validate: function (b) {
                if (b.blizzard || b.wowhead || b.collapse || b.url) {
                    if (Markup.allow < Markup.CLASS_STAFF) {
                        return false
                    }
                }
                return true
            },
            toHtml: function (b) {
                var k = "<div" + Markup._addGlobalAttributes(b);
                var c = [];
                if (b.display) {
                    c.push("display: " + b.display)
                }
                if (b.align) {
                    c.push("text-align: " + b.align)
                }
                if (c.length) {
                    k += ' style="' + c.join("; ") + '" '
                }
                k += ' class="quote';
                if (b.first) {
                    k += " first"
                }
                if (b.last) {
                    k += " last"
                }
                if (b.blizzard) {
                    if (b.unnamed && b.blizzard) {
                        var f = Markup._fixUrl(b.url);
                        var g = "View Original";
                        if (f.indexOf("bluetracker") >= 0) {
                            g = "Blue Tracker"
                        }
                        if (typeof (b.pname) != "undefined") {
                            g = b.pname
                        }
                        var j = b.unnamed.trim();
                        if (j.length <= 0) {
                            return ["", ""]
                        }
                        k = k.replace('class="quote', 'class="quote-blizz');
                        k += (b.collapse ? " collapse" : "") + '"><div class="quote-header">';
                        var h = f.match(/https?:\/\/(us|eu)\.battle\.net\/wow\/en\/blog\/([0-9]+)/i) || f.match(/https?:\/\/(us|eu)\.battle\.net\/wow\/en\/forum\/topic\/([0-9]+)/i);
                        if (h) {
                            k += 'Originally posted by <strong>Blizzard</strong> (<a href="' + f + '" target="_blank">Official Post</a>';
                            var e = h[2];
                            k += ' | <a href="http://www.wowhead.com/bluetracker?topic=' + e + '">Blue Tracker</a>)</div><div class="quote-body"><hr /><h2>' + j + "</h2>"
                        } else {
                            k += (b.url && Markup._isUrlSafe(b.url) ? 'Originally posted by <strong>Blizzard</strong> (<a href="' + Markup._fixUrl(b.url) + '" target="_blank">' + g + '</a>)</div><div class="quote-body"><hr />' : "<h2>" + j + "</h2>")
                        }
                        return [k, "</div></div>"]
                    }
                    return ["", ""]
                } else {
                    if (b.wowhead) {
                        k = k.replace('class="quote', 'class="quote-wh');
                        k += (b.collapse ? " collapse" : "") + '">';
                        k += '<div class="quote-body">';
                        return [k, "</div></div>"]
                    } else {
                        k += '">';
                        if (b.unnamed) {
                            var j = b.unnamed.trim();
                            if (j.length > 0) {
                                k += "<small><b>";
                                if (b.url && Markup._isUrlSafe(b.url)) {
                                    k += '<a href="' + Markup._fixUrl(b.url) + '"' + (Markup._isUrlExternal(b.url) ? ' target="_blank"' : "") + ">" + j + "</a>"
                                } else {
                                    if (g_isUsernameValid(j)) {
                                        k += '<a href="/user=' + j + '">' + j + "</a>"
                                    } else {
                                        k += j
                                    }
                                }
                                k += "</b> " + LANG.markup_said + '</small><div class="pad"></div>'
                            }
                        }
                        return [k, "</div>"]
                    }
                }
            }
        },
        race: {
            empty: true,
            allowInReplies: true,
            valid: {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true,
                10: true,
                11: true,
                22: true,
                24: true,
                25: true,
                26: true
            },
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                gender: {
                    req: false,
                    valid: /^(0|1)$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                if (Markup.tags.race.valid[b.unnamed]) {
                    return true
                }
                return false
            },
            toHtml: function (b) {
                var j = b.unnamed;
                var c = b.gender | 0;
                var h = Markup._getDatabaseDomainInfo(b);
                var e = h[0];
                var g = h[1];
                if (g_races[j] && g_races[j][g]) {
                    var f = g_races[j];
                    return (!b.icon ? '<img src="' + g_staticUrl + "/images/icons/tiny/" + g_races.getIcon(j, c) + '.gif" align="absmiddle" ' + Markup._addGlobalAttributes(b) + ' /> ' : "") + '<span class="tinyicontxt">' + Markup._safeHtml(f[g]) + "</span></a>"
                }
                return "(" + LANG.types[14][0] + " #" + j + ")"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_races[f] && g_races[f][c]) {
                    return Markup._safeHtml(g_races[f][c])
                }
                return LANG.types[14][0] + " #" + f
            }
        },
        random: {
            empty: false,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (c) {
                var e = [];
                for (var b = 0; b < c._nodes.length; b++) {
                    if (c._nodes[b].name == "randomoption") {
                        e.push(c._nodes[b].attr._contents)
                    }
                }
                if (e.length == 0) {
                    return [c._contents]
                }
                return [e[Math.floor(Math.random() * e.length)]]
            }
        },
        randomoption: {
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedParents: {
                random: 1
            },
            toHtml: function (b) {
                return ["", ""]
            }
        },
        reveal: {
            empty: false,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                if (!Markup.inBlog || Markup.inBlog > 1) {
                    return ["", ""]
                }
                return ['<span id="reveal-' + Markup.reveals + '" style="display: none">', '</span> <a id="revealtoggle-' + Markup.reveals + '" class="revealtoggle" href="javascript:;" onclick="Markup.toggleReveal(' + Markup.reveals + ');">(read more)</a>'];
                //Markup.reveals++
            }
        },
        s: {
            empty: false,
            allowInReplies: true,
            toHtml: function (b) {
                return ["<del" + Markup._addGlobalAttributes(b) + ">", "</del>"]
            },
            fromHtml: function (b) {
                return b.replace(/<del\b[\s\S]*?>([\s\S]*?)<\/del>/gi, "[s]$1[/s]")
            }
        },
        screenshot: {
            empty: false,
            attr: {
                id: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                thumb: {
                    req: false,
                    valid: /\S+/
                },
                size: {
                    req: false,
                    valid: /^(thumb|resized|normal)$/i
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (b) {
                if (b.url && !b.thumb) {
                    return false
                } else {
                    if (!b.id && !b.url) {
                        return false
                    }
                }
                return true
            },
            toHtml: function (b) {
                var f = "";
                var e = "";
                if (b.id) {
                    f = g_staticUrl + "/uploads/screenshots/normal/" + b.id + ".jpg";
                    var g = b.id;
                    if (b.thumb && b.thumb.match(/^[0-9]+$/)) {
                        g = b.thumb;
                        b.thumb = null
                    }
                    e = g_staticUrl + "/uploads/screenshots/" + (b.size ? b.size : "thumb") + "/" + g + ".jpg"
                } else {
                    if (b.url) {
                        f = b.url
                    }
                } if (b.thumb) {
                    e = b.thumb
                }
                var c = b._contents.replace(/\n/g, "<br />");
                if (!g_screenshots[Markup.uid]) {
                    g_screenshots[Markup.uid] = []
                }
                var h = '<a href="javascript:;" onclick="if(!g_isLeftClick(event)) return; ScreenshotViewer.show({screenshots: \'' + Markup.uid + "', pos: " + g_screenshots[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(b) + ">";
                h += '<img src="' + e + '" ';
                if (b.size && b.width) {
                    h += ' width="' + b.width + '"'
                }
                if (b.size && b.height) {
                    h += ' height="' + b.height + '"'
                }
                if (b.border != 0) {
                    h += 'class="border" '
                }
                if (b["float"]) {
                    h += 'style="float: ' + b["float"] + "; ";
                    if (b["float"] == "left") {
                        h += "margin: 0 10px 10px 0"
                    } else {
                        h += "margin: 0 0 10px 10px"
                    }
                    h += '" '
                }
                h += 'alt="" ';
                var j = {
                    caption: c,
                    width: (b.size ? null : b.width),
                    height: (b.size ? null : b.height),
                    noMarkup: true
                };
                if (b.id) {
                    j.id = b.id
                } else {
                    j.url = b.url
                }
                g_screenshots[Markup.uid].push(j);
                return [h + "/></a>"]
            }
        },
        script: {
            ltrim: true,
            rtrim: true,
            empty: false,
            attr: {
                src: {
                    req: false,
                    valid: /^\S+$/
                }
            },
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (b) {
                if (b.src) {
                    $.getScript(b.src, function () {
                        $.globalEval(b._contents)
                    })
                } else {
                    $.globalEval(b._contents)
                }
                return [""]
            }
        },
        section: {
            empty: false,
            ltrim: true,
            rtrim: true,
            trim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {},
            toHtml: function (b) {
                return ['<div class="secheader"><var></var>', "</div>"]
            }
        },
        skill: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_skills[h] && g_skills[h][f]) {
                    var c = g_skills[h];
                    return '<span class="tinyicontxt">' + Markup._safeHtml(c[f]) + "</span>";
                }
                return "(" + LANG.types[15][0] + " #" + h + ")";
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_skills[f] && g_skills[f][c]) {
                    return Markup._safeHtml(g_skills[f][c])
                }
                return LANG.types[15][0] + " #" + f
            }
        },
        small: {
            empty: false,
            toHtml: function (b) {
                return ["<small" + Markup._addGlobalAttributes(b) + ">", "</small>"]
            },
            fromHtml: function (b) {
                return b.replace(/<small\b[\s\S]*?>([\s\S]*?)<\/small>/gi, "[small]$1[/small]")
            }
        },
        sound: {
            empty: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                src: {
                    req: false,
                    valid: /\S+/
                },
                type: {
                    req: false,
                    valid: /\S+/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
            },
            validate: function (b) {
                if (b.unnamed) {
                    return true
                }
                switch (b.src.toLowerCase().substr(-4)) {
                case ".mp3":
                case ".ogg":
                    return true
                }
                return false
            },
            toHtml: function (b) {
                var e, h, g, c;
                if (b.unnamed) {
                    if (!(b.unnamed in g_sounds)) {
                        return ""
                    }
                    e = g_sounds[b.unnamed].files[0].type;
                    h = g_sounds[b.unnamed].files[0].url;
                    g = g_sounds[b.unnamed].name ? g_sounds[b.unnamed].name : g_sounds[b.unnamed].files[0].title;
                    c = "/sound=" + b.unnamed + "/" + g_urlize(g)
                } else {
                    if (Markup.allow < MARKUP_CLASS_STAFF) {
                        return ""
                    }
                    h = b.src;
                    g = h.match(/([^\/]+)\.(?:mp3|ogg)$/);
                    g = g ? g[1] : "(Unknown)";
                    if (b.hasOwnProperty("type")) {
                        e = b.type
                    } else {
                        switch (b.src.toLowerCase().substr(-4)) {
                        case ".mp3":
                            e = "audio/mpeg";
                            break;
                        case ".ogg":
                            e = 'audio/ogg; codecs="vorbis"';
                            break
                        }
                    }
                }
                h = h.toLowerCase();
                var f = '<audio preload="none" controls="true"' + Markup._addGlobalAttributes(b);
                if (b.unnamed) {
                    f += ' rel="sound=' + b.unnamed + '"'
                }
                f += ">";
                if (!(/^https?:\/\//).test(h)) {
                    h = g_staticUrl + "/wowsounds" + h
                }
                f += '<source src="' + h + '"';
                if (e) {
                    f += ' type="' + e.replace(/"/g, "&quot;") + '"'
                }
                f += ">";
                f += "</audio>";
                if (c) {
                    f = '<div class="audiomarkup">' + f + '<br><a href="' + c + '">' + g + "</a></div>"
                }
                return f
            },
            fromHtml: function (c) {
                var b = c.match(/<audio [^>]*\brel="sound=(\d+)/);
                if (b) {
                    return "[sound=" + b[1] + "]"
                }
                return c.replace(/<audio\b[\s\S]*?><source\b[\s\S]*\bsrc="([^"]*?)"[\s\S]*?<\/audio>/gi, '[sound src="$1"]')
            }
        },
        span: {
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^(hidden|invisible)$/
                },
                tooltip: {
                    req: false,
                    valid: /\S+/
                },
                tooltip2: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var e = "<span" + Markup._addGlobalAttributes(b);
                var c = [];
                if (b.unnamed == "hidden") {
                    c.push("display: none")
                } else {
                    if (b.unnamed == "invisible") {
                        c.push("visibility: hidden")
                    }
                } if (c.length > 0) {
                    e += ' style="' + c.join(";") + '"'
                }
                if (b.tooltip && Markup.tooltipTags[b.tooltip]) {
                    e += " onmouseover=\"Tooltip.showAtCursor(event, Markup.tooltipTags['" + b.tooltip + "'], 0, 0, " + (Markup.tooltipBare[b.tooltip] ? "null" : "'q'") + ", " + (b.tooltip2 && Markup.tooltipTags[b.tooltip2] ? "Markup.tooltipTags['" + b.tooltip2 + "']" : "null") + ')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"'
                }
                e += ">";
                return [e, "</span>"]
            }
        },
        spell: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                diff: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                diffnew: {
                    req: false,
                    valid: /^1$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                buff: {
                    req: false,
                    valid: /^true$/
                },
                mop: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                mopname: {
                    req: false,
                    valid: /\S+/
                },
                mopicon: {
                    req: false,
                    valid: /\S+/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (c) {
                var j = c.unnamed;
                var h = Markup._getDatabaseDomainInfo(c);
                var f = h[0];
                var g = h[1];
                var b = [];
                if (c.buff) {
                    b.push("buff")
                }
                if (c.diff) {
                    b.push("diff=" + c.diff)
                }
                if (c.diffnew) {
                    b.push("diffnew=" + c.diffnew)
                }
                if (c.mop) {
                    b.push("mop=" + c.mop)
                }
                if (g_spells[j] && g_spells[j][g]) {
                    var e = g_spells[j];
                    return '<a href="' + f + "?spell=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + (!c.icon ? ' class="iconsmall"><img src="' + g_staticUrl + "/images/icons/tiny/" + e.icon.toLowerCase() + '.png"' : "") + Markup._addGlobalAttributes(c) + ' align="absmiddle" /> <span class="tinyicontxt">' + Markup._safeHtml(e[g]) + "</span></a>"
                }
                if (c.mop && c.mopname && c.mopicon && c.mopicon.indexOf(".jpg", c.mopicon.length - 4) !== -1) {
                    return '<span class="tooltip-inside-icon" style="background:url(' + g_staticUrl + "images/wow/icons/mop-talents/18/" + Markup._safeHtml(c.mopicon) + ')"></span> <a href="' + f + "/spell=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + ' ><span class="tinyicontxt">' + Markup._safeHtml(c.mopname) + "</span></a>"
                }
                return '<a href="' + f + "?spell=" + j + '"' + (b.length ? ' rel="' + b.join("&") + '"' : "") + ">(" + LANG.types[6][0] + " #" + j + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_spells[f] && g_spells[f][c]) {
                    return Markup._safeHtml(g_spells[f][c])
                }
                return LANG.types[6][0] + " #" + f
            }
        },
        spoiler: {
            block: true,
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^.*$/
                }
            },
            rtrim: true,
            ltrim: true,
            itrim: true,
            toHtml: function(b) {
                clearTimeout(Markup.timers.spoilers);
                Markup.timers.spoilers = setTimeout(function() {
                    $('button[data-spoiler-revealer="needs-handler"].spoiler-revealer').each(function() {
                        this.onclick = function() {
                            this.parentNode.parentNode.className += " spoiler-reveal"
                        };
                        this.removeAttribute("data-spoiler-revealer")
                    });
                    $('button[data-spoiler-hider="needs-handler"].spoiler-hider').each(function() {
                        this.onclick = function() {
                            this.parentNode.parentNode.className = this.parentNode.parentNode.className.replace(/ *spoiler-reveal/g, "")
                        };
                        this.removeAttribute("data-spoiler-hider")
                    })
                }, 1);
                return ['<div class="pad"></div><div class="spoiler-wrapper"><div class="spoiler-desc"><b>' + LANG.markup_spoil + "</b> " + (b.unnamed ? b.unnamed : "") + ' <button type="button" class="spoiler-revealer btn btn-small btn-site" data-spoiler-revealer="needs-handler">' + LANG.markup_spoiler_reveal + '</button><button type="button" class="spoiler-hider btn btn-small btn-site" data-spoiler-hider="needs-handler">' + LANG.markup_spoiler_hide + "</button></div><div" + Markup._addGlobalAttributes(b) + ' class="spoiler">', "</div></div>"]
            }
        },
        statistic: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var h = b.unnamed;
                var g = Markup._getDatabaseDomainInfo(b);
                var e = g[0];
                var f = g[1];
                if (g_achievements[h] && g_achievements[h][f]) {
                    var c = g_achievements[h];
                    return '<a href="' + e + "?achievement=" + h + '"' + (!b.icon ? ' class="icontiny"><img src="' + g_staticUrl + "/images/icons/tiny/" + c.icon.toLowerCase() + '.png"' : "") + Markup._addGlobalAttributes(b) + ' align="absmiddle" /> <span class="tinyicontxt">' + Markup._safeHtml(c[f]) + "</span></a>"
                }
                return '<a href="' + e + "?achievement=" + h + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[10][0] + " #" + h + ")</a>"
            },
            toText: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_achievements[g] && g_achievements[g][e]) {
                    return Markup._safeHtml(g_achievements[g][e])
                }
                return LANG.types[10][0] + " #" + g
            }
        },
        style: {
            ltrim: true,    
            rtrim: true,
            empty: false,
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (b) {
                g_addCss(b._contents);
                return [""]
            }
        },
        sub: {
            empty: false,
            toHtml: function (b) {
                return ["<sub" + Markup._addGlobalAttributes(b) + ">", "</sub>"]
            },
            fromHtml: function (b) {
                return b.replace(/<sub\b[\s\S]*?>([\s\S]*?)<\/sub>/gi, "[sub]$1[/sub]")
            }
        },
        sup: {
            empty: false,
            toHtml: function (b) {
                return ["<sup" + Markup._addGlobalAttributes(b) + ">", "</sup>"]
            },
            fromHtml: function (b) {
                return b.replace(/<sup\b[\s\S]*?>([\s\S]*?)<\/sup>/gi, "[sup]$1[/sup]")
            }
        },
        tabs: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                tab: 1
            },
            attr: {
                name: {
                    req: true,
                    valid: /\S+/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (c) {
                c.id = g_urlize(c.name);
                var b = Markup.preview;
                var h = '<div class="clear"></div><div id="dsf67g4d-' + c.id + (b ? "-preview" : "") + '"></div>';
                h += "<div";
                if (c.width) {
                    h += ' style="width: ' + c.width + '"'
                }
                h += ">";
                h += '<div class="tabbed-contents">';
                var f = c._contents;
                for (var e = 0; e < f.length; ++e) {
                    var g = f[e];
                    h += '<div id="tab-' + c.id + "-" + g.id + '" style="display: none">';
                    h += g.content;
                    h += '<div class="clear"></div>';
                    h += "</div>"
                }
                h += "</div>";
                h += "</div>";
                setTimeout(Markup.createTabs.bind(null, c, f, (b ? "preview" : "")), 100);
                return [h]
            }
        },
        tab: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedParents: {
                tabs: 1
            },
            attr: {
                name: {
                    req: true,
                    valid: /[\S ]+/
                },
                icon: {
                    req: false,
                    valid: /\S+/
                }
            },
            toHtml: function (b) {
                b.id = g_urlize(b.name);
                b.name = str_replace(b.name, "_", " ");
                if (typeof (b["class"]) != "undefined") {
                    b["class"] = str_replace(b["class"], "_", " ")
                }
                return [{
                    content: b._contents,
                    id: b.id,
                    name: b.name,
                    icon: b.icon,
                    "class": b["class"]
                }]
            }
        },
        table: {
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                tr: 1
            },
            attr: {
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                cellspacing: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                cellpadding: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (b) {
                var c = "<table" + Markup._addGlobalAttributes(b);
                if (b.border != undefined) {
                    c += ' border="' + b.border + '"'
                }
                if (b.cellspacing != undefined) {
                    c += ' cellspacing="' + b.cellspacing + '"'
                }
                if (b.cellpadding != undefined) {
                    c += ' cellpadding="' + b.cellpadding + '"'
                }
                if (b.width != undefined) {
                    c += ' style="width: ' + b.width + '"'
                }
                c += "><tbody>";
                return [c, "</tbody></table>"]
            },
            fromHtml: function (j, h) {
                h = h || 0;
                var b;
                if (b = Markup.matchOuterTags(j, "<table\\b[\\s\\S]*?>", "</table>", "g")) {
                    for (var e = 0; e < b.length; ++e) {
                        var c = b[e][1].match(/border[:="]+\s*([0-9]+)/i),
                            f = b[e][1].match(/width[:="]+\s*([0-9]+)/i),
                            g = b[e][1].match(/cellspacing="([\s\S]+?)"/i),
                            k = b[e][1].match(/cellpadding="([\s\S]+?)"/i);
                        j = j.replace(b[e][1] + b[e][0] + b[e][2], "\n" + Array(h + 1).join("\t") + "[table" + (c ? " border=" + c[1] : "") + (f ? " width=" + f[1] : "") + (g ? " cellspacing=" + g[1] : "") + (k ? " cellpadding=" + k[1] : "") + "]" + Markup.tags.table.fromHtml(b[e][0], h + 1) + "\n" + Array(h + 1).join("\t") + "[/table]")
                    }
                }
                return j
            }
        },
        tr: {
            empty: false,
            itrim: true,
            allowedChildren: {
                td: 1
            },
            allowedParents: {
                table: 1
            },
            toHtml: function (b) {
                return ["<tr" + Markup._addGlobalAttributes(b) + ">", "</tr>"]
            },
            fromHtml: function (f, e) {
                e = e || 0;
                var b;
                if (b = Markup.matchOuterTags(f, "<tr\\b[\\s\\S]*?>", "</tr>", "g")) {
                    for (var c = 0; c < b.length; ++c) {
                        f = f.replace(b[c][1] + b[c][0] + b[c][2], "\n\t" + Array(e + 1).join("\t") + "[tr]" + Markup.tags.tr.fromHtml(b[c][0], e + 1) + "\n" + Array(e + 1).join("\t") + "[/tr]")
                    }
                }
                return f
            }
        },
        td: {
            empty: false,
            itrim: true,
            allowedParents: {
                tr: 1
            },
            attr: {
                unnamed: {
                    req: false,
                    valid: /^header$/
                },
                align: {
                    req: false,
                    valid: /^(right|left|center|justify)$/i
                },
                valign: {
                    req: false,
                    valid: /^(top|middle|bottom|baseline)$/i
                },
                colspan: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                rowspan: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (b) {
                var c = "<" + (b.unnamed ? "th" : "td") + Markup._addGlobalAttributes(b);
                if (b.align != undefined) {
                    c += ' align="' + b.align + '"'
                }
                if (b.valign != undefined) {
                    c += ' valign="' + b.valign + '"'
                }
                if (b.colspan != undefined) {
                    c += ' colspan="' + b.colspan + '"'
                }
                if (b.rowspan != undefined) {
                    c += ' rowspan="' + b.rowspan + '"'
                }
                if (b.width != undefined) {
                    c += ' style="width: ' + b.width + '"'
                }
                c += ">";
                return [c, "</" + (b.unnamed ? "th" : "td") + ">"]
            },
            fromHtml: function (n, k) {
                k = k || 0;
                var p = ["td", "th"],
                    e;
                for (var g = 0; g < p.length; ++g) {
                    if (e = Markup.matchOuterTags(n, "<" + p[g] + "\\b[\\s\\S]*?>", "</" + p[g] + ">", "g")) {
                        for (var h = 0; h < e.length; ++h) {
                            var b = e[h][1].match(/width[:="]+\s*([0-9]+)/i),
                                l = e[h][1].match(/align="([\s\S]+?)"/i),
                                o = e[h][1].match(/valign="([\s\S]+?)"/i),
                                c = e[h][1].match(/colspan="([\s\S]+?)"/i),
                                f = e[h][1].match(/rowspan="([\s\S]+?)"/i);
                            n = n.replace(e[h][1] + e[h][0] + e[h][2], "\n\t\t" + Array(k + 1).join("\t") + "[td" + (p[g] == "th" ? "=header" : "") + (b ? " width=" + b[1] : "") + (l ? " align=" + l[1] : "") + (o ? " valign=" + o[1] : "") + (c ? " colspan=" + c[1] : "") + (f ? " rowspan=" + f[1] : "") + "]" + Markup.tags.td.fromHtml(e[h][0], k + 1) + "[/td]")
                        }
                    }
                }
                return n
            }
        },
        time: {
            empty: true,
            count: 0,
            attr: {
                until: {
                    req: false,
                    valid: /^\d+$/
                },
                since: {
                    req: false,
                    valid: /^\d+$/
                },
                server: {
                    req: false,
                    valid: /^true$/
                }
            },
            validate: function (b) {
                if (!b.until && !b.since) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var e = Markup.tags.time.count++;
                var c = '<span title="' + (new Date((b.until ? b.until : b.since) * 1000)).toLocaleString() + '" id="markupTime' + e + '">' + Markup.tags.time.getTime(b) + "</span>";
                setInterval(Markup.tags.time.updateTime.bind(null, e, b), 5000);
                return c
            },
            getTime: function (b) {
                var e;
                if (b.server) {
                    e = g_serverTime.getTime() / 1000
                } else {
                    e = (new Date()).getTime() / 1000
                }
                var c = 0;
                if (b.until) {
                    c = b.until - e
                } else {
                    c = e - b.since
                } if (c > 0) {
                    return g_formatTimeElapsed(c)
                } else {
                    return "0 " + LANG.timeunitspl[6]
                }
            },
            updateTime: function (e, b) {
                var c = ge("markupTime" + e);
                if (!c) {
                    return
                }
                c.firstChild.nodeValue = Markup.tags.time.getTime(b)
            }
        },
        toc: {
            block: true,
            post: true,
            trim: true,
            ltrim: true,
            rtrim: true,
            collect: {
                h2: 1,
                h3: 1
            },
            exclude: {
                tabs: {
                    h2: 1,
                    h3: 1
                },
                minibox: {
                    h2: 1,
                    h3: 1
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                h3: {
                    req: false,
                    valid: /^false$/
                }
            },
            postHtml: function (j, b) {
                var l = "<h3";
                var f = [];
                if (j.first) {
                    f.push("first")
                }
                if (j.last) {
                    f.push("last")
                }
                if (f.length > 0) {
                    l += ' class="' + f.join(" ") + '"'
                }
                l += Markup._addGlobalAttributes(j) + ">" + LANG.markup_toc + "</h3><ul>";
                var k = "";
                var h = 1;
                var m = (j.h3 != "false");
                var c = [];
                for (var e in b.h2) {
                    c.push(b.h2[e])
                }
                for (var e in b.h3) {
                    c.push(b.h3[e])
                }
                c.sort(function (o, n) {
                    return o.offset - n.offset
                });
                for (var g in c) {
                    e = c[g];
                    if (e.name == "h2" && e.attr.toc != "false") {
                        if (k == "h3") {
                            l += "</ul>";
                            h--
                        }
                        l += "<li><b><a href='#" + (e.attr.id ? g_urlize(e.attr.id) : g_urlize(e.attr._textContents)) + "'>" + e.attr._textContents + "</a></b></li>";
                        k = "h2"
                    }
                    if (e.name == "h3" && m && e.attr.toc != "false" && (k != "" || b.h2.length == 0)) {
                        if (k == "h2") {
                            l += "<ul>";
                            h++
                        }
                        l += "<li><b><a href='#" + (e.attr.id ? g_urlize(e.attr.id) : g_urlize(e.attr._textContents)) + "'>" + e.attr._textContents + "</a></b></li>";
                        k = "h3"
                    }
                }
                for (var g = 0; g < h; g++) {
                    l += "</ul>"
                }
                return l
            }
        },
        toggler: {
            empty: false,
            attr: {
                id: {
                    req: true,
                    valid: /^[a-z0-9_-]+$/i
                },
                unnamed: {
                    req: false,
                    valid: /^hidden$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = '<a href="javascript:;" class="disclosure-' + (b.unnamed ? "off" : "on") + '" onclick="return g_disclose(ge(\'' + b.id + "'), this)\">";
                return [c, "</a>"]
            }
        },
        tooltip: {
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                },
                name: {
                    req: false,
                    valid: /\S+/
                },
                bare: {
                    req: false,
                    valid: /^true$/i
                },
                label: {
                    req: false,
                    valid: /[\S ]+/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (b) {
                if (!b.unnamed && !b.name) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                if (b.unnamed) {
                    return ['<span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG[\'' + b.unnamed + '\'], 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">', "</span>"]
                } else {
                    Markup.tooltipTags[b.name] = (b.label ? '<table><tr><td class="q0" style="width: 300px"><small>' + b.label + "</small></td></tr></table>" : "") + b._contents;
                    if (b.bare) {
                        Markup.tooltipBare[b.name] = true
                    }
                    return [""]
                }
            }
        },
        u: {
            empty: false,
            allowInReplies: true,
            toHtml: function (b) {
                return ["<ins" + Markup._addGlobalAttributes(b) + ">", "</ins>"]
            },
            fromHtml: function (b) {
                return b.replace(/<(ins|u)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[u]$2[/u]")
            }
        },
        ul: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                li: 1
            },
            toHtml: function (b) {
                var c = "<ul";
                var e = [];
                if (b.first) {
                    e.push("first")
                }
                if (b.last) {
                    e.push("last")
                }
                if (e.length > 0) {
                    c += ' class="' + e.join(" ") + '"'
                }
                c += Markup._addGlobalAttributes(b) + ">";
                return [c, "</ul>"]
            },
            fromHtml: function (f, e) {
                e = e || 0;
                var b;
                if (b = Markup.matchOuterTags(f, "<ul\\b[\\s\\S]*?>", "</ul>", "g")) {
                    for (var c = 0; c < b.length; ++c) {
                        f = f.replace(b[c][1] + b[c][0] + b[c][2], "\n" + Array(e + 1).join("\t") + "[ul]" + Markup.tags.ul.fromHtml(b[c][0], e + 1) + "\n" + Array(e + 1).join("\t") + "[/ul]")
                    }
                }
                return f
            }
        },
        url: {
            allowedClass: MARKUP_CLASS_USER,
            allowInReplies: true,
            empty: false,
            helpText: "[url=http://www.google.com]" + LANG.markup_url + "[/url]",
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                },
                rel: {
                    req: false,
                    valid: /(item|quest|spell|achievement|npc|object|petability)=([0-9]+)/
                },
                onclick: {
                    req: false,
                    valid: /[\S ]+/
                },
                tooltip: {
                    req: false,
                    valid: /\S+/
                },
                tooltip2: {
                    req: false,
                    valid: /\S+/
                }
            },
            validate: function (b) {
                if (b.onclick && Markup.allow < Markup.CLASS_ADMIN) {
                    return false
                }
                if (b.tooltip && Markup.allow < Markup.CLASS_STAFF) {
                    return false
                }
                var c = "";
                if (b.unnamed && /^(mailto:|irc:)/i.test(b.unnamed.trim()) && Markup.allow < Markup.CLASS_STAFF) {
                    return false
                }
                if (b.unnamed && /^(javascript:)/i.test(b.unnamed.trim())) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var e;
                if (b.unnamed) {
                    e = b.unnamed;
                    e = e.replace(/&amp;/, "&");
                    if (!e.match(/^([^:\\.\/]+):/i) && e.charAt(0) != "/" && e.charAt(0) != "#") {
                        e = "?" + e
                    }
                    if (Markup._isUrlSafe(e, true)) {
                        var c = "<a" + Markup._addGlobalAttributes(b) + ' href="' + Markup._fixUrl(e) + '"';
                        if (Markup._isUrlExternal(e)) {
                            c += ' target="_blank"'
                        }
                        if (b.rel) {
                            c += ' rel="' + b.rel + '"'
                        }
                        if (b.onclick) {
                            c += ' onclick="' + b.onclick + '"'
                        }
                        if (b.tooltip && Markup.tooltipTags[b.tooltip]) {
                            c += " onmouseover=\"Tooltip.showAtCursor(event, Markup.tooltipTags['" + b.tooltip + "'], 0, 0, " + (Markup.tooltipBare[b.tooltip] ? "null" : "'q'") + ", " + (b.tooltip2 && Markup.tooltipTags[b.tooltip2] ? "Markup.tooltipTags['" + b.tooltip2 + "']" : "null") + ')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"'
                        }
                        c += ">";
                        return [c, "</a>"]
                    } else {
                        return ["", ""]
                    }
                } else {
                    e = b._textContents;
                    e = e.replace(/&amp;/, "&");
                    if (Markup._isUrlSafe(e)) {
                        var c = "<a" + Markup._addGlobalAttributes(b) + ' href="' + Markup._fixUrl(e) + '"';
                        if (Markup._isUrlExternal(e)) {
                            c += ' target="_blank"'
                        }
                        if (b.rel) {
                            c += ' rel="' + b.rel + '"'
                        }
                        if (b.onclick) {
                            c += ' onclick="' + b.onclick + '"'
                        }
                        c += ">";
                        return [c + e + "</a>"]
                    } else {
                        return ["", ""]
                    }
                }
            },
            fromHtml: function (b) {
                return b.replace(/<a\b[^>]*?href=\"(.+?)\"[\s\S]*?>([\s\S]*?)<\/a>/gi, "[url=$1]$2[/url]")
            }
        },
        video: {
            empty: true,
            attr: {
                id: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                unnamed: {
                    req: false,
                    valid: /^embed$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            ltrim: true,
            rtrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                if (g_videos[b.id]) {
                    var c = "",
                        e = g_videos[b.id];
                    if (b.unnamed) {
                        if (e.videoType == 1) {
                            c += Markup.toHtml("[youtube=" + e.videoId + "]", {
                                skipReset: true
                            })
                        }
                    } else {
                        if (!g_videos[Markup.uid]) {
                            g_videos[Markup.uid] = []
                        }
                        c += '<div style="position: relative; display: -moz-inline-stack; display: inline-block; zoom: 1; *display: inline"><a href="' + sprintf(vi_siteurls[e.videoType], e.videoId) + '" onclick="if(!g_isLeftClick(event)) return; VideoViewer.show({videos: \'' + Markup.uid + "', pos: " + g_videos[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(b) + ">";
                        c += '<img src="' + sprintf(vi_thumbnails[e.videoType], e.videoId) + '" ';
                        if (b.border != 0) {
                            c += 'class="border" '
                        }
                        if (b["float"]) {
                            c += 'style="float: ' + b["float"] + "; ";
                            if (b["float"] == "left") {
                                c += "margin: 0 10px 10px 0"
                            } else {
                                c += "margin: 0 0 10px 10px"
                            }
                            c += '" '
                        }
                        if (e.hasCaption) {
                            c += 'alt="' + Markup.removeTags(e.caption, {
                                mode: Markup.MODE_SIGNATURE,
                                skipReset: true
                            }) + '" '
                        }
                        c += '/><img src="' + g_staticUrl + "/images/icons" + MarkupIconPath + '/play-sm.png" style="opacity: 0.6; filter:alpha(opacity=60); position: absolute; width: 48px; height: 48px; top: 23px; left: 38px" />';
                        c += "</a></div>";
                        g_videos[Markup.uid].push(dO(e))
                    }
                    return c
                }
                return "<b>Video #" + b.id + "</b>"
            }
        },
        visitedpage: {
            empty: false,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                $.post("/visited-page", {
                    id: b.unnamed
                }, function () {
                    AchievementCheck()
                });
                return ""
            }
        },
        wowheadresponse: {
            block: true,
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /[\S ]+/
                },
                roles: {
                    req: true,
                    valid: /[0-9]+/
                }
            },
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var g = "<div" + Markup._addGlobalAttributes(b);
                var e = [];
                g += ' class="quote ';
                if (b.first) {
                    g += "firstmargin "
                }
                if (b.last) {
                    g == "last "
                }
                var f = b.unnamed.trim();
                if (f.length <= 0) {
                    return ["", ""]
                }
                var c = "";
                if (b.roles & U_GROUP_ADMIN) {
                    c = "comment-blue"
                } else {
                    c = "comment-green"
                } if (g_customColors[f]) {
                    c = "comment-" + g_customColors[f]
                }
                g += c + '"><small class="icon-wowhead"><b class="' + c + '"><a href="/user=' + f + '">' + f + "</a></b> " + LANG.markup_said + '</small><div class="pad"></div>';
                return [g, "</div>"]
            }
        },
        youtube: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /\S+/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                autoplay: {
                    req: false,
                    valid: /^true$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                var c = "http://www.youtube.com/v/" + b.unnamed + "&fs=1&rel=0" + (b.autoplay ? "&autoplay=1" : "");
                var f = b.width ? b.width : 640;
                var g = b.height ? b.height : 385;
                var e = "";
                e += '<object width="' + f + '" height="' + g + '"' + Markup._addGlobalAttributes(b) + '><param name="movie" value="' + c + '">';
                e += '<param name="allowfullscreen" value="true"></param>';
                e += '<param name="allowscriptaccess" value="always"></param>';
                e += '<param name="wmode" value="opaque"></param>';
                e += '<embed width="' + f + '" height="' + g + '" src="' + c + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
                e += "</object>";
                return e
            },
            fromHtml: function (j) {
                var c;
                if (c = j.match(/<iframe\b[\s\S]*?src="[\s\S]*?youtube\.com\/embed\/[\s\S]*?"[\s\S]*?><\/iframe>/gi)) {
                    for (var f = 0; f < c.length; ++f) {
                        var b = c[f].match(/src="[\s\S]*?youtube\.com\/embed\/([\s\S]*?)"/i),
                            g = c[f].match(/width[:="]+\s*([0-9]+)/i),
                            h = c[f].match(/height[:="]+\s*([0-9]+)/i),
                            e = c[f].match(/border[:="]+\s*([0-9]+)/i);
                        j = j.replace(c[f], "[youtube=" + b[1] + (g ? " width=" + g[1] : "") + (h ? " height=" + h[1] : "") + "]")
                    }
                }
                return j
            }
        },
        center: {
            empty: false,
            allowInReplies: false,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (b) {
                return ["<center>", "</center>"]
            },
            fromHtml: function (b) {
                return b.replace(/<center>([\s\S]+?)<\/center>/gi, "[pad][div align=center]$1[/div][pad]")
            }
        },
        title: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_titles[g] && g_titles[g][e]) {
                    return '<a href="' + c + "?title=" + g + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(g_titles[g][e]) + "</a>"
                }
                return '<a href="' + c + "?title=" + g + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[11][0] + " #" + g + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_titles[f] && g_titles[f][c]) {
                    return Markup._safeHtml(g_titles[f][c])
                }
                return LANG.types[11][0] + " #" + f
            }
        },
        "transmog-set": {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_transmogsets[g] && g_transmogsets[g][e]) {
                    return '<a href="' + c + "?transmog-set=" + g + '"' + Markup._addGlobalAttributes(b) + ' class="q' + g_transmogsets[g]["quality"] + '">' + Markup._safeHtml(g_transmogsets[g][e]) + "</a>"
                }
                return '<a href="' + c + "?transmog-set=" + g + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[101][0] + " #" + g + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_transmogsets[f] && g_transmogsets[f][c]) {
                    return Markup._safeHtml(g_transmogsets[f][c])
                }
                return LANG.types[101][0] + " #" + f
            }
        },
        zone: {
            empty: true,
            allowInReplies: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|wod|mop|ptr|www|de|es|fr|ru|pt)$/
                }
            },
            validate: function (b) {
                if ((b.domain || b.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var c = f[0];
                var e = f[1];
                if (g_gatheredzones[g] && g_gatheredzones[g][e]) {
                    return '<a href="' + c + "?zone=" + g + '"' + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(g_gatheredzones[g][e]) + "</a>"
                }
                return '<a href="' + c + "?zone=" + g + '"' + Markup._addGlobalAttributes(b) + ">(" + LANG.types[7][0] + " #" + g + ")</a>"
            },
            toText: function (b) {
                var f = b.unnamed;
                var e = Markup._getDatabaseDomainInfo(b);
                var c = e[1];
                if (g_gatheredzones[f] && g_gatheredzones[f][c]) {
                    return Markup._safeHtml(g_gatheredzones[f][c])
                }
                return LANG.types[7][0] + " #" + f
            }
        }
    },
    _addGlobalAttributes: function (b) {
        var c = "";
        if (Markup.allow < Markup.CLASS_STAFF) {
            return c
        }
        if (b.id) {
            c += ' id="' + b.id + '"'
        }
        if (b.title) {
            c += ' title="' + Markup._safeQuotes(b.title) + '"'
        }
        if (b["class"]) {
            c += ' class="' + b["class"] + '"'
        }
        if (b["data-highlight"]) {
            c += ' data-highlight="' + b["data-highlight"] + '"'
        }
        return c
    },
    _generateTagDocs: function (f, c) {
        var b = Markup.tags[f];
        if (!b) {
            return ""
        }
        if (c) {
            if ((b.allowedClass && b.allowedClass > c) || (!b.helpText && (b.empty || b.allowedParents || b.allowedChildren || !LANG["markup_" + f]))) {
                return ""
            }
            if (b.helpText && typeof b.helpText == "function") {
                var j = b.helpText()
            } else {
                if (b.helpText && typeof b.helpText == "string") {
                    var j = b.helpText
                } else {
                    var j = "[" + f + "]" + LANG["markup_" + f].toLowerCase() + "[/" + f + "]"
                }
            }
            return "<tr><td><pre>" + j + "</pre></td><td>" + Markup.toHtml(j, {
                skipReset: true
            }) + "</td></tr>"
        }
        var j = '<div><h3 class="first">Tag: [' + Markup._safeHtml(f) + "]</h3>";
        j += '<table class="grid">';
        if (b.attr) {
            j += '<tr><td align="right" width="200">Attributes:</td><td>';
            for (var e in b.attr) {
                j += '<div style="margin: 5px; display: inline-block"><table><tr><th style="background-color: #242424; font-weight: bolder" colspan="2">';
                if (e == "unnamed") {
                    j += "Self ([" + f + "=???])"
                } else {
                    j += e
                }
                j += "</th></tr>";
                j += '<tr><td align="right">Required:</td><td>' + (b.attr[e].req ? "Yes" : "No") + "</td></tr>";
                j += '<tr><td align="right">Valid:</td><td>' + (b.attr[e].valid ? Markup._safeHtml(b.attr[e].valid.toString()) : "--") + "</td></tr></table></div>"
            }
            j += "</td></tr>"
        }
        j += '<tr><td align="right" width="200">Has closing tag:</td><td>' + (b.empty ? "No" : "Yes") + "</td></tr>";
        j += '<tr><td align="right">Required group:</td><td>';
        if (b.allowedClass == MARKUP_CLASS_ADMIN) {
            j += "Administrator"
        } else {
            if (b.allowedClass == MARKUP_CLASS_STAFF) {
                j += "Staff"
            } else {
                if (b.allowedClass == MARKUP_CLASS_PREMIUM) {
                    j += "Premium"
                } else {
                    if (b.allowedClass && b.allowedClass != MARKUP_CLASS_PENDING) {
                        j += "Not pending"
                    } else {
                        j += "None"
                    }
                }
            }
        }
        j += "</td></tr>";
        if (b.allowedChildren) {
            j += '<tr><td align="right">Allowed children:</td><td>';
            for (var g in b.allowedChildren) {
                j += Markup._safeHtml(g) + "<br />"
            }
            j += "</td></tr>"
        }
        if (b.allowedParents) {
            j += '<tr><td align="right">Allowed parents:</td><td>';
            for (var g in b.allowedParents) {
                j += Markup._safeHtml(g) + "<br />"
            }
            j += "</td></tr>"
        }
        if (b.presets) {
            j += '<tr><td align="right">Preset values:</td><td><table>';
            for (var h in b.presets) {
                j += '<tr><td align="right">' + h + "</td><td>" + Markup._safeHtml(b.presets[h]) + "</td></tr>"
            }
            j += "</table></td></tr>"
        }
        if (b.trim) {
            j += '<tr><td colspan="2">Trim whitespace</td></tr>'
        }
        if (b.ltrim) {
            j += '<tr><td colspan="2">Trim preceding whitespace</td></tr>'
        }
        if (b.rtrim) {
            j += '<tr><td colspan="2">Trim following whitespace</td></tr>'
        }
        if (b.itrim) {
            j += '<tr><td colspan="2">Trim whitespace around interior content</td></tr>'
        }
        if (b.block) {
            j += '<tr><td colspan="2">Automatically remove top padding if not the first item</td></tr>'
        }
        j += "</table></div>";
        return j
    },
    _init: function () {
        if (!this.inited) {
            var c = [],
                e = [],
                g = [];
            for (var b in Markup.tags) {
                if (Markup.tags[b].block) {
                    this.firstTags[b] = true
                }
                if (Markup.tags[b].exclude) {
                    for (var f in Markup.tags[b].exclude) {
                        if (!this.excludeTags[f]) {
                            this.excludeTags[f] = {}
                        }
                        this.excludeTags[f][b] = Markup.tags[b].exclude[f]
                    }
                }
                if (Markup.tags[b].post) {
                    this.postTags.push(b)
                }
                if (Markup.tags[b].trim) {
                    g.push(b)
                }
                if (Markup.tags[b].ltrim) {
                    c.push(b)
                }
                if (Markup.tags[b].rtrim) {
                    e.push(b)
                }
            }
            if (c.length > 0) {
                this.ltrimRegex = new RegExp("\\s*\\[(" + c.join("|") + ")([^a-z0-9]+.*)?]", "ig")
            }
            if (e.length > 0) {
                this.rtrimRegex = new RegExp("\\[/(" + e.join("|") + ")\\]\\s*", "ig")
            }
            if (g.length > 0) {
                this.trimRegex = new RegExp("\\s*\\[(" + g.join("|") + ")([^\\[]*)?\\]\\s*", "ig")
            }
            this.inited = true;
            $("[data-highlight]").live("mouseenter", function () {
                var h = $(this).attr("data-highlight").split(":");
                if (h.length != 2) {
                    return
                }
                var j = $("#" + h[0]).get(0),
                    m = parseInt(h[1]),
                    l = $(j).val();
                if (!j || !m || !l) {
                    return
                }
                var k = $(j).val(l.substr(0, m))[0].scrollHeight;
                $(j).val(l).animate({
                    scrollTop: k
                }, 250);
                j.selectionStart = m;
                j.selectionEnd = m
            })
        }
    },
    _safeJsString: function (b) {
        return b.replace(/'/g, "'")
    },
    _safeQuotes: function (b) {
        return b.replace('"', '"').replace("'", "'")
    },
    _safeHtml: function (b) {
        var c = ["nbsp", "ndash"];
        if (typeof b == "undefined") {
            return ""
        }
        b = b.replace(/&/g, "&amp;");
        if (c.length > 0) {
            b = b.replace(new RegExp("&amp;(" + c.join("|") + ");", "g"), "&$1;")
        }
        return b.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    },
    _preText: function (b) {
        b = Markup._safeHtml(b);
        b = b.replace(/\n/g, "<br />");
        return b
    },
    _getDatabaseDomainInfo: function (c, g) {
        var e = "";
        var f = Markup.nameCol;
        if (typeof g == "undefined") {
            g = ""
        }
        var b = false;
        if (c.domain) {
            b = c.domain
        } else {
            if (c.site) {
                b = c.site
            } else {
                if (Markup.defaultSource) {
                    b = MarkupSourceMap[Markup.defaultSource]
                }
            }
        }
        return [e, f, b]
    },
    _isUrlSafe: function (f, b) {
        if (!f) {
            return true
        }
        if (f == "javascript:;") {
            return true
        }
        var c = f.match(/^([^:\\./]+):/i);
        if (c && c[1]) {
            var e = c[1];
            if (e == "http" || e == "https") {
                return true
            }
            if (b && (e == "mailto" || e == "irc")) {
                return true
            }
            if (e != "mailto" && f.indexOf("://") == -1) {
                return true
            }
            return false
        }
        return true
    },
    _fixUrl: function (b) {
        if (!b) {
            return ""
        }
        var c = b.charAt(0);
        if (c == "/" || c == "?") {
            b = b.replace(/^[\/\?]+/, "");
            b = "?" + b
        }
        return b
    },
    _isUrlExternal: function (b) {
        if (!b) {
            return false
        }
        return (b.indexOf("wowhead.com") == -1 && b.match(/^([^:\\./]+):/i))
    },
    _nodeSearch: function (c, b, e) {
        if (!e) {
            e = 0
        }
        if (e >= 3) {
            return
        }
        if (c.name == b) {
            return true
        } else {
            if (c.parent) {
                return Markup._nodeSearch(c.parent, b, e + 1)
            }
        }
    },
    _parse: function (q, g) {
        Markup.nameCol = "name_" + Locale.getName();
        if (g && g.locale) {
            Markup.nameCol = "name_" + Markup.domainToLocale[g.locale]
        }
        if (!q) {
            q = ""
        }
        q = q.replace(/\r/g, "");
        if (!g) {
            g = {}
        }
        if (!g.skipReset) {
            Markup.uid = g.uid || "abc";
            Markup.root = g.root;
            Markup.preview = g.preview || false;
            Markup.dbpage = g.dbpage || false;
            Markup.defaultSource = false;
            if (Markup.uid != "abc") {
                g_screenshots[Markup.uid] = []
            }
        }
        if (g.roles && (g.roles & (U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER)) && g.mode != Markup.MODE_SIGNATURE) {
            g.mode = Markup.MODE_ARTICLE
        }
        Markup.mode = g.mode || Markup.MODE_ARTICLE;
        Markup.allow = g.allow || Markup.CLASS_STAFF;
        Markup.inBlog = g.inBlog ? g.inBlog : 0;
        if (g.stopAtBreak) {
            var w = q.indexOf("[break]");
            if (w != -1) {
                q = q.substring(0, w)
            }
        } else {
            q = q.replace("[break]", "")
        }
        var n = new MarkupTree();
        q = q.trim();
        if (this.postTags.length) {
            for (var u in this.postTags) {
                var G = this.postTags[u];
                if (q.indexOf("[" + G) != -1) {
                    if (!(Markup.tags[G].allowedModes && Markup.tags[G].allowedModes[MarkupModeMap[g.mode]] == undefined)) {
                        for (var k in Markup.tags[G].collect) {
                            this.collectTags[k] = true
                        }
                    }
                }
            }
        }
        q = q.replace(/\n(\s*)\n/g, "\n\n");
        var v = q.length;
        var A = 0,
            l = 0,
            h = -1,
            m = -1,
            b = true,
            r = false;
        var c = function (L) {
            var I, K, J;
            if (L.charAt(0) == '"' || L.charAt(0) == "'") {
                I = L.charAt(0);
                var H = L.indexOf(I, 1);
                if (H > -1) {
                    J = L.substring(1, H);
                    L = L.substring(H + 1).trim();
                    return {
                        value: Markup._safeHtml(J),
                        str: L
                    }
                }
            }
            K = L.indexOf(" ");
            if (K > -1) {
                J = L.substring(0, K);
                L = L.substring(K + 1).trim()
            } else {
                J = L;
                L = ""
            }
            return {
                value: J,
                str: L
            }
        };
        var t = /^\s*[a-z0-9]+\s*=/;
        while (l < v) {
            h = q.indexOf("[", l);
            if (h > -1) {
                l = h + 1;
                if (h > 0 && q.charAt(h - 1) == "\\") {
                    b = false;
                    h = -1
                } else {
                    m = q.indexOf("]", l)
                }
            } else {
                l = v
            }
            var e, o = {};
            if (g.highlight && $(g.highlight)) {
                o["data-highlight"] = g.highlight + ":" + h
            }
            if (m > -1) {
                var C = q.substring(h + 1, m);
                if (C.charAt(0) == "/") {
                    r = true;
                    e = C.substr(1).trim().toLowerCase()
                }
                if (!r) {
                    var B = C.indexOf(" "),
                        z = C.indexOf("=");
                    var D;
                    if ((z < B || B == -1) && z > -1) {
                        e = C.substring(0, z).toLowerCase();
                        C = C.substring(z + 1).trim();
                        var F = c(C);
                        C = F.str;
                        if (Markup.tags[e] == undefined || Markup.tags[e].attr == undefined || Markup.tags[e].attr.unnamed == undefined) {
                            b = false
                        } else {
                            o.unnamed = F.value
                        }
                    } else {
                        if (B > -1) {
                            e = C.substring(0, B).toLowerCase();
                            C = C.substring(B + 1).trim();
                            if (C.indexOf("=") == -1) {
                                if (Markup.tags[e] == undefined || Markup.tags[e].attr == undefined || Markup.tags[e].attr.unnamed == undefined) {
                                    b = false
                                } else {
                                    o.unnamed = C
                                }
                                C = ""
                            }
                        } else {
                            e = C.toLowerCase();
                            C = ""
                        }
                    } if (Markup.tags[e] == undefined) {
                        b = false
                    } else {
                        if (b) {
                            var G = Markup.tags[e];
                            while (C != "") {
                                var p = "";
                                if (!t.test(C)) {
                                    p = "unnamed"
                                } else {
                                    z = C.indexOf("=");
                                    if (z == -1) {
                                        b = false;
                                        break
                                    }
                                    p = C.substring(0, z).trim().toLowerCase();
                                    C = C.substring(z + 1).trim()
                                }
                                var F = c(C);
                                C = F.str;
                                if (G.attr == undefined || G.attr[p] == undefined) {
                                    if (Markup.attributes[p] == undefined || (Markup.attributes[p].valid != undefined && !Markup.attributes[p].valid.test(F.value))) {
                                        b = false;
                                        break
                                    }
                                }
                                o[p] = F.value
                            }
                            if (b && G.attr) {
                                for (var E in G.attr) {
                                    if (G.attr[E].req && o[E] == undefined) {
                                        b = false;
                                        break
                                    } else {
                                        if (o[E] == undefined) {
                                            continue
                                        }
                                    } if (G.attr[E].valid != undefined && !G.attr[E].valid.test(o[E])) {
                                        b = false;
                                        break
                                    }
                                }
                                if (b && G.validate != undefined) {
                                    b = G.validate(o)
                                }
                            }
                        }
                    }
                } else {
                    if (Markup.tags[e] == undefined) {
                        b = false
                    }
                }
            } else {
                b = false
            } if (b) {
                if (A != h) {
                    var j = q.substring(A, h).replace(/\\\[/g, "[");
                    var f = {
                        _rawText: j
                    };
                    n.openTag("<text>", f)
                }
                if (r) {
                    b = n.closeTag(e)
                } else {
                    b = n.openTag(e, o)
                } if (b) {
                    A = l = m + 1
                } else {
                    A = h
                }
            }
            b = true;
            r = false;
            h = m = -1
        }
        if (A < v) {
            var j = q.substr(A).replace(/\\\[/g, "[");
            var f = {
                _rawText: j
            };
            n.openTag("<text>", f)
        }
        return n
    },
    createMaps: function () {
        for (var c = 0; c < Markup.maps.length; ++c) {
            var b = Markup.maps[c];
            new Mapper({
                parent: b[0],
                zone: b[1],
                coords: b[2],
                unique: c
            })
        }
        Markup.maps = []
    },
    toHtml: function (f, e) {
        if (!e) {
            e = {}
        }
        if (!e.allow) {
            if (e.roles) {
                e.allow = Markup.rolesToClass(e.roles)
            } else {
                e.allow = Markup.CLASS_STAFF
            }
        }
        var b = Markup._parse(f, e);
        var c = b.toHtml();
        if (e.prepend) {
            c = e.prepend + c
        }
        if (e.append) {
            c += e.append
        }
        setTimeout(Markup.createMaps, 250);
        return c
    },
    fromHtml: function (e, c) {
        e = e.replace(/\n+/g, "");
        e = e.replace(/\s+/g, " ");
        e = e.replace(/> </g, "><");
        e = e.replace(/&amp;/gi, "&");
        e = e.replace(/(&#160;|$nbsp;)/gi, " ");
        for (var b in Markup.tags) {
            if (Markup.tags[b].fromHtml) {
                e = Markup.tags[b].fromHtml(e, c)
            }
        }
        e = e.replace(/<style\b[\s\S]*?>[\s\S]*?<\/style>/g, "");
        e = e.replace(/<\/?[a-z][a-z0-9]*\b[\s\S]*?>/g, " ");
        e = e.replace(/<!--(.*?)-->/g, "");
        e = e.replace(/\n[\n]+/g, "\n\n");
        e = e.replace(/[ ]+/g, " ");
        e = e.replace(/\t/g, "  ");
        return trim(e)
    },
    removeTags: function (e, c) {
        var b = Markup._parse(e, c);
        return b.tagless()
    },
    matchOuterTags: function (p, h, u, c) {
        var k = c.indexOf("g") > -1,
            o = c.replace(/g/g, ""),
            r = new RegExp(h + "|" + u, "g" + o),
            j = new RegExp(h, o),
            q = [],
            v, w, e, b;
        do {
            v = 0;
            while (e = r.exec(p)) {
                if (j.test(e[0])) {
                    if (!v++) {
                        w = r.lastIndex;
                        b = e
                    }
                } else {
                    if (v) {
                        if (!--v) {
                            q.push([p.slice(w, e.index), b[0], e[0]]);
                            if (!k) {
                                return q
                            }
                        }
                    }
                }
            }
        } while (v && (r.lastIndex = w));
        return (q.length ? q : false)
    },
    getImageUploadIds: function (e, c) {
        var b = Markup._parse(e, c);
        return b.imageUploadIds()
    },
    printHtml: function (e, f, c) {
        f = ge(f);
        var b = Markup.toHtml(e, c);
        f.innerHTML = b;
        Markup.createMaps()
    },
    toggleReveal: function (e) {
        var b = $("#reveal-" + e);
        if (b.length == 0) {
            return
        }
        var c = $("#revealtoggle-" + e);
        if (b.is(":visible")) {
            b.hide();
            c.text("(read more)")
        } else {
            b.show();
            c.text("(hide)")
        }
    },
    mapperPreview: function (f) {
        try {
            window.mapper = Markup.maps[f];
            var c = window.open("/edit=mapper-preview", "mapperpreview", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=800,height=540");
            c.focus()
        } catch (b) {}
    },
    createTabs: function (b, f, h) {
        var c = new Tabs({
            parent: ge("dsf67g4d-" + b.id + (h ? "-preview" : "")),
            forum: 1,
            noScroll: (h ? true : false)
        });
        for (var e = 0; e < f.length; ++e) {
            var g = f[e];
            c.add(g.name, {
                id: b.id + "-" + g.id,
                icon: g.icon,
                "class": g["class"]
            })
        }
        c.flush()
    }
};
var MarkupUtil = {
    ltrimText: function (b) {
        b._rawText = b._rawText.ltrim();
        return b
    },
    rtrimText: function (b) {
        b._rawText = b._rawText.rtrim();
        return b
    },
    checkSiblingTrim: function (b, c) {
        if (c.name == "<text>" && (Markup.tags[b.name].rtrim || Markup.tags[b.name].trim)) {
            c.attr = MarkupUtil.ltrimText(c.attr)
        } else {
            if (b.name == "<text>" && (Markup.tags[c.name].ltrim || Markup.tags[c.name].trim)) {
                b.attr = MarkupUtil.rtrimText(b.attr)
            }
        }
        return [b, c]
    }
};
var MarkupTree = function () {
    this.nodes = [];
    this.currentNode = null
};
MarkupTree.prototype = {
    openTag: function (c, e) {
        if (c != "<text>" && Markup.tags[c] && !Markup.tags[c].allowedClass) {
            Markup.tags[c].allowedClass = MARKUP_CLASS_PENDING
        }
        if (!Markup.tags[c]) {
            return false
        } else {
            if (Markup.tags[c].allowedModes && Markup.tags[c].allowedModes[MarkupModeMap[Markup.mode]] == undefined) {
                return false
            } else {
                if (Markup.tags[c].allowedClass && Markup.tags[c].allowedClass > Markup.allow) {
                    return false
                }
            }
        } if (Markup.mode == MARKUP_MODE_REPLY && !Markup.tags[c].allowInReplies) {
            return false
        }
        var f = {
            name: c,
            attr: e,
            parent: null,
            nodes: []
        };
        if (this.currentNode) {
            f.parent = this.currentNode
        }
        if (Markup.tags[c].allowedParents) {
            if (f.parent != null) {
                if (Markup.tags[c].allowedParents[f.parent.name] === undefined) {
                    return false
                }
            } else {
                if (Markup.root == undefined || Markup.tags[c].allowedParents[Markup.root] == undefined) {
                    return false
                }
            }
        }
        if (f.parent && Markup.tags[f.parent.name].allowedChildren && Markup.tags[f.parent.name].allowedChildren[c] == undefined) {
            return false
        }
        if (this.currentNode) {
            if (this.currentNode.nodes.length == 0 && f.name == "<text>" && Markup.tags[this.currentNode.name].itrim) {
                f.attr = MarkupUtil.ltrimText(f.attr)
            } else {
                if (this.currentNode.nodes.length > 0) {
                    var b = this.currentNode.nodes.length - 1;
                    var g = MarkupUtil.checkSiblingTrim(this.currentNode.nodes[b], f);
                    this.currentNode.nodes[b] = g[0];
                    f = g[1]
                }
            } if (f.name == "<text>") {
                f.attr._text = Markup._preText(f.attr._rawText);
                if (f.attr._text.length > 0) {
                    this.currentNode.nodes.push(f)
                }
            } else {
                this.currentNode.nodes.push(f)
            }
        } else {
            if (this.nodes.length > 0) {
                var b = this.nodes.length - 1;
                var g = MarkupUtil.checkSiblingTrim(this.nodes[b], f);
                this.nodes[b] = g[0];
                f = g[1]
            }
            if (f.name == "<text>") {
                f.attr._text = Markup._preText(f.attr._rawText);
                if (f.attr._text.length > 0) {
                    this.nodes.push(f)
                }
            } else {
                this.nodes.push(f)
            }
        } if (!Markup.tags[c].empty && !Markup.tags[c].post) {
            this.currentNode = f
        }
        return true
    },
    closeTag: function (e) {
        if (Markup.tags[e].empty || Markup.tags[e].post) {
            return false
        }
        if (!this.currentNode) {
            return false
        } else {
            if (this.currentNode.name == e) {
                if (this.currentNode.nodes.length > 0) {
                    var c = this.currentNode.nodes.length - 1;
                    if (Markup.tags[this.currentNode.name].itrim && this.currentNode.nodes[c].name == "<text>") {
                        var g = this.currentNode.nodes[c];
                        g.attr = MarkupUtil.rtrimText(g.attr);
                        g.attr._text = Markup._preText(g.attr._rawText);
                        this.currentNode.nodes[c] = g
                    }
                }
                this.currentNode = this.currentNode.parent
            } else {
                var f = function (j, h) {
                    for (var k = h.length - 1; k >= 0; --k) {
                        if (h[k].name == j) {
                            return k
                        }
                    }
                    return -1
                };
                var b;
                if (this.currentNode.parent) {
                    b = f(e, this.currentNode.parent.nodes)
                } else {
                    b = f(e, this.nodes)
                } if (b == -1) {
                    return false
                }
            }
        }
        return true
    },
    toHtml: function () {
        var f = [];
        var e = {};
        for (var l in Markup.collectTags) {
            e[l] = []
        }
        this.tagless(true);
        var k = 0;
        var b = function (m, p, v) {
            var z = "";
            for (var o = 0; o < m.length; ++o) {
                var n = m[o];
                if (p == 0 && o == 0 && Markup.firstTags[n.name]) {
                    n.attr.first = true
                } else {
                    if (p > 0 && o == 0 && Markup.firstTags[n.parent.name]) {
                        n.attr.first = true
                    }
                } if (o == m.length - 1 && Markup.firstTags[n.name]) {
                    n.attr.last = true
                }
                if (Markup.excludeTags[n.name]) {
                    v[n.name] = (v[n.name] ? v[n.name] + 1 : 1)
                }
                for (var w in v) {
                    for (var A in Markup.excludeTags[w]) {
                        if (Markup.excludeTags[w][A][n.name]) {
                            n.attr[A] = false
                        }
                    }
                }
                if (Markup.collectTags[n.name]) {
                    n.offset = k++;
                    e[n.name].push(n)
                }
                if (Markup.tags[n.name].post) {
                    var u = "<!--" + Math.random() + "-->";
                    z += u;
                    f.push([n, u])
                } else {
                    if (Markup.tags[n.name].empty) {
                        var r;
                        if (n.parent && Markup.tags[n.parent.name].rawText) {
                            r = Markup.tags[n.name].toHtml(n.attr, {
                                needsRaw: true
                            })
                        } else {
                            r = Markup.tags[n.name].toHtml(n.attr)
                        } if (typeof r == "string") {
                            z += r
                        } else {
                            if (r !== undefined) {
                                if (z == "") {
                                    z = []
                                }
                                z.push(r)
                            }
                        }
                    } else {
                        var q = arguments.callee(n.nodes, p + 1, v);
                        n.attr._contents = q;
                        n.attr._nodes = n.nodes;
                        var B = Markup.tags[n.name].toHtml(n.attr);
                        if (B.length == 2) {
                            z += B[0] + q + B[1]
                        } else {
                            if (B.length == 1) {
                                if (typeof B[0] == "string") {
                                    z += B[0]
                                } else {
                                    if (z == "") {
                                        z = []
                                    }
                                    z.push(B[0])
                                }
                            }
                        }
                    }
                } if (v[n.name]) {
                    v[n.name]--;
                    if (v[n.name] == 0) {
                        delete v[n.name]
                    }
                }
            }
            return z
        };
        str = b(this.nodes, 0, []);
        for (var h = 0; h < f.length; ++h) {
            var g = f[h][0];
            var c = f[h][1];
            var j = Markup.tags[g.name].postHtml(g.attr, e);
            if (typeof j == "string") {
                str = str.replace(c, j)
            }
        }
        return str
    },
    tagless: function (e) {
        var b = function (g) {
            var k = "";
            for (var h = 0; h < g.length; ++h) {
                var j = g[h];
                var f = arguments.callee(j.nodes);
                if (e) {
                    j.attr._textContents = f
                } else {
                    j.attr._contents = f
                } if (j.name == "<text>") {
                    k += Markup.tags[j.name].toHtml(j.attr, {
                        noLink: true,
                        noNbsp: true
                    })
                } else {
                    if (Markup.tags[j.name].toText) {
                        k += Markup.tags[j.name].toText(j.attr)
                    }
                } if (!Markup.tags[j.name].taglessSkip) {
                    k += f
                }
            }
            return k
        };
        if (e) {
            b(this.nodes)
        } else {
            var c = b(this.nodes);
            c = c.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
            return c
        }
    },
    imageUploadIds: function () {
        var c = [];
        var b = function (e) {
            for (var f = 0; f < e.length; ++f) {
                var g = e[f];
                if (g.name == "img" && g.attr.upload) {
                    c.push(g.attr.upload)
                }
                arguments.callee(g.nodes)
            }
        };
        b(this.nodes);
        return c
    }
};
Markup.tags.modelviewer = Markup.tags.model;
Markup.reveals = 0;
Markup._init();