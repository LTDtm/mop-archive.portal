
function Mapper(c, f) {
    cO(this, c);
    if (this.parent && !this.parent.nodeName) {
        this.parent = ge(this.parent)
    } else {
        if (!this.parent) {
            return
        }
    }
    var b;
    this.mouseX = this.mouseY = 0;
    this.editable = this.editable || false;
    this.overlay = this.overlay || false;
    if (this.editable) {
        this.zoomable = this.toggle = false;
        this.show = this.mouse = true
    } else {
        this.zoomable = (this.zoomable == null ? true : this.zoomable);
        this.toggle = (this.toggle == null ? true : this.toggle);
        this.show = (this.show == null ? true : this.show);
        this.mouse = (this.mouse == null ? false : this.mouse)
    }
    this.buttons = (this.buttons == null ? true : this.buttons);
    this.zoneLink = (this.zoneLink == null ? true : this.zoneLink);
    if (location.href.indexOf("zone=") != -1) {
        this.zoneLink = false
    }
    this.zoom = (this.zoom == null ? 0 : this.zoom);
    this.zone = (this.zone == null ? 0 : this.zone);
    this.level = (this.level == null ? (Mapper.zoneDefaultLevel[this.zone] ? Mapper.zoneDefaultLevel[this.zone] : this.fixLevel(0, this.zone)) : this.level);
    this.pins = [];
    this.nCoords = 0;
    this.tempWidth = null;
    this.tempHeight = null;
    this.parent.className = "mapper";
    this.parent.appendChild(this.span = ce("span", {
        className: "mapper-map"
    }));
    ns(this.span);
    this.overlaySpan = b = ce("div", {
        className: "mapper-overlay"
    });
    this.overlaySpan.appendChild(ce("div", {
        className: "mapper-overlay-expander"
    }));
    this.span.appendChild(b);
    this.buttonDiv = b = ce("div");
    b.style.position = "absolute";
    b.style.top = b.style.right = "3px";
    if (this.buttons) {
        this.parent.appendChild(b)
    }
    if (this.editable) {
        this.span.onmouseup = this.addPin.bind(this);
        b = g_createGlow(LANG.mapper_tippin);
        b.style.fontSize = "13px";
        b.style.position = "absolute";
        b.style.bottom = b.style.right = "0";
        ns(b);
        this.parent.appendChild(b)
    } else {
        this.sToggle = b = g_createButton(LANG.mapper_hidepins, null, {
            click: this.toggleShow.bind(this)
        });
        b.style["float"] = "right";
        b.style.display = "none";
        ns(b);
        this.buttonDiv.appendChild(b)
    }
    if (this.zoomable && !Platform.isMobile()) {
        this.span.onclick = this.toggleZoom.bind(this);
        this.span.id = "sjdhfkljawelis" + (this.unique !== undefined ? this.unique : "");
        this.sZoom = b = g_createGlow(LANG.mapper_tipzoom, "mapper-zoomtip");
        b.style.fontSize = "13px";
        b.style.position = "absolute";
        b.style.bottom = b.style.right = "0";
        ns(b);
        this.span.appendChild(b)
    }
    this.sZoneLink = b = g_createGlow("");
    b.style.display = "none";
    b.style.position = "absolute";
    b.style.top = b.style.left = "0";
    this.parent.appendChild(b);
    if (this.mouse) {
        this.parent.onmouseout = (function() {
            this.timeout = setTimeout((function() {
                this.sMouse.style.display = "none"
            }).bind(this), 1)
        }).bind(this);
        this.parent.onmouseover = (function() {
            clearTimeout(this.timeout);
            this.sMouse.style.display = ""
        }).bind(this);
        this.span.onmousemove = this.span.onmousedown = this.getMousePos.bind(this);
        this.sMouse = b = g_createGlow("(0.0, 0.0)");
        b.style.display = "none";
        b.style.position = "absolute";
        b.style.bottom = b.style.left = "0";
        b.onmouseup = sp;
        ns(b);
        this.span.appendChild(b)
    }
    this.floorPins = {};
    if (c.coords != null) {
        this.setCoords(c.coords)
    } else {
        if (c.link != null) {
            this.setLink(c.link)
        }
    }
    if (c.objectives) {
        this.setObjectives(c.objectives)
    }
    if (c.zoneparent && c.zones) {
        this.setZones(c.zoneparent, c.zones)
    }
    this.updateMap(f)
}
Mapper.sizes = [
    [488, 325, "normal"],
    [772, 515, "zoom"],
    [1002, 668, "original"],
    [224, 149, "small"]
];
Mapper.onlyOneFloor = {
    4120: true,
    4264: true,
    4375: true,
    4415: true,
    4493: true,
    4500: true,
    4603: true,
    4723: true,
    4809: true,
    4813: true,
    4820: true
};
Mapper.zoneLevelOffset = {};
Mapper.garrisonLevelsToMapTiers = {
    7004: {
        26: 1,
        27: 2,
        28: 3
    },
    7078: {
        23: 1,
        24: 2,
        25: 3
    }
};
Mapper.zoneDefaultLevel = {
    3456: 5,
    4812: 5,
    6298: 1,
    6142: 3,
    6611: 1
};
Mapper.remappedLevels = {
    4273: {
        6: 5
    },
    2257: {
        0: 2
    }
};
//Mapper.multiLevelZones = {};
Mapper.zonePhased = {};
Mapper.prototype = {
    getMap: function() {
        return this.parent
    },
    update: function(c, j) {
        if (c.zoom != null) {
            this.zoom = c.zoom
        }
        if (c.zone != null) {
            this.zone = c.zone
        }
        if (c.show != null) {
            this.show = c.show
        }
        this.pins = [];
        this.nCoords = 0;
        for (var h in this.floorPins) {
            if (this.floorPins[h].parentNode) {
                de(this.floorPins[h])
            }
        }
        this.floorPins = {};
        if (this.floorButton) {
            de(this.floorButton);
            this.floorButton = null
        }
        var b = (c.level === undefined ? 0 : this.fixLevel(parseInt(c.level), this.zone));
        if (!c.preservelevel) {
            this.level = 0
        } else {
            b = this.level
        }
        var f = false;
        if (isset("g_mapperData")) {
            f = g_mapperData
        } else {
            if (isset("g_mapper_data")) {
                f = g_mapper_data
            }
        }
        if (f && f[this.zone] && !c.coords) {
            var l = f[this.zone];
            var g = -1;
            for (var h in l) {
                h = parseInt(h);
                var m = this.fixLevel(h, this.zone);
                if (c.level === undefined && l[h].count > g) {
                    b = parseInt(m);
                    g = l[h].count
                }
                if (l[h].coords) {
                    this.setCoords(l[h].coords, m)
                }
            }
            this.level = b;
            if (this.floorPins[this.level]) {
                ae(this.span, this.floorPins[this.level])
            }
        } else {
            if (c.coords != null) {
                var k = 999;
                for (var h in c.coords) {
                    var m = h /*this.fixLevel(h, this.zone)*/;
                    this.setCoords(c.coords[h], m);
                    if (m < k) {
                        k = m
                    }
                }
                if (k != 999 && !c.preservelevel) {
                    this.level = k
                }
                if (this.floorPins[this.level]) {
                    ae(this.span, this.floorPins[this.level])
                }
            } else {
                if (c.link != null) {
                    this.setLink(c.link)
                }
            }
        }
        this.updateMap(j)
    },
    fixLevel: function(g, f) {
        if (Mapper.zoneLevelOffset[f] !== undefined) {
            g += Mapper.zoneLevelOffset[f]
        } else {
            if (Mapper.multiLevelZones.hasOwnProperty(f)) {
                var x = parseInt(Mapper.multiLevelZones[f][0].substr(("" + f).length + 1));
                /*var y;
                for (var b = 1; b < Mapper.multiLevelZones[f].length; b++) {
                    y = parseInt(Mapper.multiLevelZones[f][b].substr(("" + f).length + 1));
                    if (Math.abs(g - y) < Math.abs(g - x)) {
                        x = y
                    }
                }*/
                return x
            }
        }
        if (Mapper.remappedLevels[f] && Mapper.remappedLevels[f][g] !== undefined) {
            g = Mapper.remappedLevels[f][g]
        }
        return g
    },
    getZone: function() {
        return this.zone
    },
    setZone: function(b, f, c) {
        this.pins = [];
        this.nCoords = 0;
        if (this.floorPins[this.level]) {
            de(this.floorPins[this.level])
        }
        this.floorPins = {};
        if (this.floorButton) {
            de(this.floorButton);
            this.floorButton = null
        }
        this.zone = b;
        this.level = f | 0;
        this.updateMap(c);
        return true
    },
    getFloorsMenu: function() {
        if (!Mapper.multiLevelZones[this.zone]) {
            return null
        }
        var j = [];
        var f = Mapper.multiLevelZones[this.zone];
        var h = (Mapper.zonePhased[this.zone] ? g_zone_phases : g_zone_areas);
        var c = (function(k) {
            return k[0] == this.level || (this.level === undefined && k[0] == 0)
        }).bind(this);
        var l;
        for (var g = 0; g < f.length; ++g) {
            if (f[g] == "") {
                continue
            }
            if (f[g].indexOf("-") < 0) {
                l = g
            } else {
                l = parseInt(f[g].substr(f[g].indexOf("-") + 1))
            }
            var b;
            if (!h[this.zone]) {
                b = [l, (Mapper.zonePhased[this.zone] ? "[Phase " : "[Level ") + l + "]", this.setMap.bind(this, f[g], l, true)]
            } else {
                b = [l, h[this.zone][g + (Mapper.zonePhased[this.zone] || h[this.zone][0] != "" ? 0 : 1)], this.setMap.bind(this, f[g], l, true)]
            }

            if (b[1]) {
                b[MENU_IDX_OPT] = {
                    checkedFunc: c
                };
                j.push(b)
            }
        }
        return j
    },
    setMap: function(c, f, l) {
        if (f != this.level) {
            if (this.floorPins[this.level]) {
                de(this.floorPins[this.level])
            }
            if (this.floorPins[f]) {
                ae(this.span, this.floorPins[f])
            }
            this.level = f
        }
        /*var k = Locale.getName();
        if (g_isPtr()) {
            k = "ptr"
        } else {
            if (g_isBeta()) {
                k = "beta"
            }
        }*/
        var delim = Mapper.zonePhased[this.zone] ? "_" : "-";
        var bg_url = "";
		if (this.level != 0 && Mapper.multiLevelZones[this.zone] && Mapper.multiLevelZones[this.zone].length > 1) {
			bg_url = "http://mop-static.tauri.hu/images/maps/enus/" + Mapper.sizes[this.zoom][2] + "/" + this.zone + delim + this.level + ".jpg";
		} else {
			bg_url = "http://mop-static.tauri.hu/images/maps/enus/" + Mapper.sizes[this.zoom][2] + "/" + this.zone + ".jpg";
		}
        this.span.style.background = "url(" + bg_url + ")";

        if (this.overlay)
            this.overlaySpan.style.background = "url(http://mop-static.tauri.hu/images/maps/overlay/" + Mapper.sizes[this.zoom][2] + "/" + this.zone + ".png)";

        var that = this;
        var img = new Image();
        img.src = bg_url;
        img.onerror = function() {
            that.span.style.background = "url(templates/wowhead/images/map-error-" + Mapper.sizes[that.zoom][2] + ".png)";
        };

        if (this.sZoneLink) {
            var j = "";
            var h = parseInt(this.zone);
            var m = g_zones[h] != null;
            var b = (Mapper.zonePhased[this.zone] ? g_zone_phases : g_zone_areas);
            if (m) {
                if (this.zoneLink) {
                    j += '<a href="?zone=' + h + '">' + g_zones[h] + "</a>"
                }
                if (Mapper.multiLevelZones[h] && Mapper.multiLevelZones[h].length > 1) {
                    if (this.zoneLink) {
                        j += ": "
                    }
                    j += (b[h] ? b[h][this.level] : (Mapper.zonePhased[h] ? "Phase " : "Level ") + (this.level))
                }
                g_setInnerHtml(this.sZoneLink, j, "div");
                if (this.zoneLink) {
                    for (var g = 0; g < 9; ++g) {
                        if (g == 4) {
                            continue
                        }
                        this.sZoneLink.childNodes[g].firstChild.style.color = "black"
                    }
                }
            }
            this.sZoneLink.style.display = m ? "" : "none"
        }
        if (l) {
            this.onMapUpdate && this.onMapUpdate(this)
        }
    },
    setObjectives: function(m) {
        var c = {
            start: 1,
            end: 1,
            startend: 1,
            sourcestart: 1,
            sourceend: 1
        };
        for (var p in m) {
            var o = m[p];
            if (g_mapperData[p] === undefined) {
                g_mapperData[p] = {}
            }
            var k = {};
            var n = 0;
            for (var f in o.levels) {
                var b = o.levels[f];
                var j = ShowOnMap.combinePins(b);
                var g = j[0];
                g_mapperData[p][f] = {
                    count: g.length,
                    coords: []
                };
                for (var h = 0; h < g.length; ++h) {
                    var q = ShowOnMap.buildTooltip(g[h].list);
                    g_mapperData[p][f].coords.push([g[h].coord[0], g[h].coord[1], {
                        type: q[1],
                        url: q[2],
                        menu: q[3],
                        label: q[0]
                    }])
                }
            }
        }
    },
    setZones: function(o, p) {
        o = $("#" + o);
        if (!o || !p || p.length == 0 || !this.objectives) {
            return
        }
        var t = function(C, H, B, I) {
            var G = [false, -1];
            for (var E = 0; E < B.length; ++E) {
                if (E > 0) {
                    v.append((E == B.length - 1 ? LANG.and : LANG.comma))
                }
                var F = null;
                if (C.objectives[B[E][0]].mappable > 0) {
                    F = $("<a/>", {
                        href: "javascript:;",
                        text: C.objectives[B[E][0]].zone
                    });
                    F.click(function(K, J) {
                        C.update({
                            zone: J
                        });
                        g_setSelectedLink(K, "mapper")
                    }.bind(C, F[0], B[E][0]));
                    F.isLink = true
                } else {
                    F = $("<a/>", {
                        href: "?zone=" + B[E][0],
                        text: C.objectives[B[E][0]].zone
                    });
                    g_addTooltip(F[0], LANG.tooltip_zonelink)
                }
                if (p.length > 1) {
                    var D = I[B[E][0]];
                    if (D.start && D.end) {
                        F.addClass("icontiny");
                        F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_startend.gif)");
                        F.css("padding-left", "20px")
                    } else {
                        if (D.start) {
                            F.addClass("icontiny");
                            F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)");
                            F.css("padding-left", "14px")
                        } else {
                            if (D.end) {
                                F.addClass("icontiny");
                                F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_end.gif)");
                                F.css("padding-left", "16px")
                            }
                        }
                    }
                }
                H.append(F);
                if (B[E][1] > G[1]) {
                    G = [F, B[E][1]]
                }
            }
            return G[0]
        };
        var l = function(B, F, E) {
            var C = [];
            for (var D = 0; D < B.length; ++D) {
                if (F[B[D][0]][E]) {
                    C.push(B[D])
                }
            }
            return C
        };
        var h = {};
        var m = {
            start: [],
            end: [],
            objective: []
        };
        for (var f in this.objectives) {
            if (h[f] === undefined) {
                h[f] = {}
            }
            var w = this.objectives[f];
            for (var q in w.levels) {
                var c = w.levels[q];
                for (var u = 0; u < c.length; ++u) {
                    if (c[u].point == "start" || c[u].point == "sourcestart") {
                        m.start.push(f);
                        h[f].start = true
                    } else {
                        if (c[u].point == "end" || c[u].point == "sourceend") {
                            m.end.push(f);
                            h[f].end = true
                        } else {
                            if (c[u].point == "requirement" || c[u].point == "sourcerequirement") {
                                m.objective.push(f);
                                h[f].objective = true
                            }
                        }
                    }
                }
            }
        }
        o.append(g_getMajorHeading(LANG.mapper_relevantlocs, 2, 3));
        if (p.length == 1 && this.missing == 0) {
            var v = $("<span/>", {
                html: LANG.mapper_entiretyinzone.replace("$$", "<b>" + this.objectives[p[0][0]].zone + "</b>.")
            });
            o.append(v);
            this.update({
                zone: p[0][0]
            })
        } else {
            if (this.missing > 0) {
                var v = $("<span/>");
                var n = false,
                    k = false,
                    y = false;
                m.objective = array_unique(m.objective);
                m.start = array_unique(m.start);
                m.end = array_unique(m.end);
                var z = m.start.length > 0 && array_compare(m.start, m.end);
                var g = m.start.length > 0 && array_compare(m.start, m.objective);
                var r = m.end.length > 0 && array_compare(m.end, m.objective);
                var A = l(p, h, "objective");
                var b = l(p, h, "start");
                var j = l(p, h, "end");
                if (z && g) {
                    var s = LANG.mapper_happensin.split("$$");
                    v.text(s[0]);
                    n = t(this, v, p, h);
                    v.append(s[1])
                } else {
                    if (z && m.objective.length == 0) {
                        var s = LANG.mapper_objectives.sex.split("$$");
                        v.text(s[0]);
                        n = t(this, v, p, h);
                        v.append(s[1])
                    } else {
                        if (z) {
                            var s = LANG.mapper_objectives.ox_sey.split("$$");
                            v.text(s[0]);
                            n = t(this, v, b, h);
                            v.append(s[1]);
                            k = t(this, v, A, h);
                            v.append(s[2])
                        } else {
                            if (g && m.end.length == 0) {
                                var s = LANG.mapper_objectives.osx.split("$$");
                                v.text(s[0]);
                                n = t(this, v, p, h);
                                v.append(s[1])
                            } else {
                                if (g) {
                                    var s = LANG.mapper_objectives.osx_ey.split("$$");
                                    v.text(s[0]);
                                    n = t(this, v, A, h);
                                    v.append(s[1]);
                                    k = t(this, v, j, h);
                                    v.append(s[2])
                                } else {
                                    if (r && m.start.length == 0) {
                                        var s = LANG.mapper_objectives.oex.split("$$");
                                        v.text(s[0]);
                                        n = t(this, v, p, h);
                                        v.append(s[1])
                                    } else {
                                        if (r) {
                                            var s = LANG.mapper_objectives.oex_sy.split("$$");
                                            v.text(s[0]);
                                            n = t(this, v, b, h);
                                            v.append(s[1]);
                                            k = t(this, v, A, h);
                                            v.append(s[2])
                                        } else {
                                            if (m.start.length > 0 && m.end.length > 0 && m.objective.length > 0) {
                                                var s = LANG.mapper_objectives.ox_sy_ez.split("$$");
                                                v.text(s[0]);
                                                n = t(this, v, b, h);
                                                v.append(s[1]);
                                                k = t(this, v, A, h);
                                                v.append(s[2]);
                                                y = t(this, v, j, h);
                                                v.append(s[3])
                                            } else {
                                                if (m.start.length > 0 && m.end.length > 0) {
                                                    var s = LANG.mapper_objectives.sx_ey.split("$$");
                                                    v.text(s[0]);
                                                    n = t(this, v, b, h);
                                                    v.append(s[1]);
                                                    k = t(this, v, j, h);
                                                    v.append(s[2])
                                                } else {
                                                    if (m.start.length > 0 && m.objective.length > 0) {
                                                        var s = LANG.mapper_objectives.ox_sy.split("$$");
                                                        v.text(s[0]);
                                                        n = t(this, v, b, h);
                                                        v.append(s[1]);
                                                        k = t(this, v, A, h);
                                                        v.append(s[2])
                                                    } else {
                                                        if (m.end.length > 0 && m.objective.length > 0) {
                                                            var s = LANG.mapper_objectives.ox_ey.split("$$");
                                                            v.text(s[0]);
                                                            n = t(this, v, A, h);
                                                            v.append(s[1]);
                                                            k = t(this, v, j, h);
                                                            v.append(s[2])
                                                        } else {
                                                            if (m.start.length > 0) {
                                                                var s = LANG.mapper_objectives.sx.split("$$");
                                                                v.text(s[0]);
                                                                n = t(this, v, p, h);
                                                                v.append(s[1])
                                                            } else {
                                                                if (m.end.length > 0) {
                                                                    var s = LANG.mapper_objectives.ex.split("$$");
                                                                    v.text(s[0]);
                                                                    n = t(this, v, p, h);
                                                                    v.append(s[1])
                                                                } else {
                                                                    if (m.objective.length > 0) {
                                                                        var s = LANG.mapper_objectives.ox.split("$$");
                                                                        v.text(s[0]);
                                                                        n = t(this, v, p, h);
                                                                        v.append(s[1])
                                                                    } else {
                                                                        var s = LANG.mapper_happensin.split("$$");
                                                                        v.text(s[0]);
                                                                        n = t(this, v, p, h);
                                                                        v.append(s[1])
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                o.append(v);
                if (n && n.isLink) {
                    n.click()
                } else {
                    if (k && k.isLink) {
                        k.click()
                    } else {
                        if (y && y.isLink) {
                            y.click()
                        }
                    }
                }
            } else {
                var s = LANG.mapper_happensin.split("$$");
                var v = $("<span/>", {
                    text: s[0]
                });
                var n = t(this, v, p, h);
                v.append(s[1]);
                o.append(v);
                if (n && n.isLink) {
                    n.click()
                }
            }
        }
    },
    setSize: function(b, c) {
        this.tempWidth = b;
        this.tempHeight = c;
        this.updateMap(true)
    },
    getZoom: function() {
        return this.zoom
    },
    setZoom: function(b, c) {
        this.zoom = b;
        this.tempWidth = this.tempHeight = null;
        this.updateMap(c)
    },
    toggleZoom: function(b) {
        this.zoom = 1 - this.zoom;
        this.updateMap(true);
        if (b) {
            this.getMousePos(b)
        }
        if (this.sZoom) {
            if (this.sZoom.style.display == "none") {
                this.sZoom.style.display = ""
            } else {
                this.sZoom.style.display = "none"
            }
        }
        if (this.zoom) {
            MapViewer.show({
                mapper: this
            })
        }
    },
    getShow: function() {
        return this.show
    },
    setShow: function(b) {
        this.show = b;
        var f = this.show ? "" : "none";
        for (var c in this.floorPins) {
            this.floorPins[c].style.display = f
        }
        this.sToggle.innerHTML = this.show ? LANG.mapper_hidepins : LANG.mapper_showpins
    },
    toggleShow: function() {
        this.setShow(!this.show)
    },
    getCoords: function() {
        var b = [];
        for (var c in this.pins) {
            if (!this.pins[c].free) {
                b.push([this.pins[c].x, this.pins[c].y])
            }
        }
        return b
    },
    clearPins: function() {
        for (var b in this.pins) {
            this.pins[b].style.display = "none";
            this.pins[b].free = true
        }
    },
    setCoords: function(r, n) {
        var q;
        var c, l;
        if (n === undefined) {
            this.clearPins();
            if (r.length) {
                l = true;
                c = 0
            } else {
                for (var k in r) {
                    c = k;
                    break
                }
                if (c == null) {
                    return
                }
                r = r[c]
            }
            c = parseInt(c);
            if (!l) {
                c = this.fixLevel(c, this.zone);
                this.level = c
            }
        } else {
            c = n
        }
        this.nCoords = r.length;
        for (var k in r) {
            var o = r[k],
                g = o[2];
            if (o[0] === undefined || o[1] === undefined) {
                continue
            }
            q = this.getPin(c);
            q.x = o[0];
            q.y = o[1];
            q.style.left = q.x + "%";
            q.style.top = q.y + "%";
            if (this.editable) {
                q.a.onmouseup = this.delPin.bind(this, q)
            } else {
                if (g && g.url) {
                    q.a.href = Markup._fixUrl(g.url);
                    q.a.rel = "np" + (g.rel ? "&" + g.rel : "");
                    q.a.style.cursor = "pointer"
                }
            }
            if (g && g.tooltip) {
                q.a.tt = "";
                var m = false;
                for (var b in g.tooltip) {
                    if (q.a.tt != "") {
                        q.a.tt += "<br />"
                    }
                    q.a.tt += '<b class="q">' + b + "</b> ($)<br />";
                    for (var v in g.tooltip[b].info) {
                        q.a.tt += "<div>" + g.tooltip[b].info[v] + "</div>"
                    }
                    if (!m && g.tooltip[b].footer) {
                        q.a.tt += g.tooltip[b].footer + "<br />";
                        m = true
                    }
                }
            } else {
                if (g && g.label) {
                    q.a.tt = g.label
                } else {
                    if (g && g.fixTooltip) {
                        q.a.rel = q.a.rel.replace(/^np&?/, "");
                        dE(q.a, "mouseover", this.pinOver);
                        dE(q.a, "mouseout", Tooltip.hide);
                        q.a.tt = "";
                        if (typeof g.fixTooltip == "function") {
                            q.a._fixTooltip = g.fixTooltip
                        }
                    } else {
                        q.a.tt = "$"
                    }
                }
            }
            if (g && g.menu) {
                q.a.menu = g.menu;
                Menu_.add(q.a, q.a.menu, {
                    showAtCursor: true
                })
            }
            if (g && g.type) {
                q.className += " pin-" + g.type
            }
            if (g && g.mapicon) {
                q.className += " pin-object";
                q.a.style.backgroundPosition = (((g.mapicon + 2) % 8) * -16) + "px " + (Math.floor((g.mapicon + 2) / 8) * -16) + "px"
            }
            q.a.tt = str_replace(q.a.tt, "$", q.x.toFixed(1) + ", " + q.y.toFixed(1));
            if (g && g.lines) {
                for (var f = 0, j = g.lines.length; f < j; ++f) {
                    if (o[0] == g.lines[f][0] && o[1] == g.lines[f][1]) {
                        continue
                    }
                    for (var u = 0, h = Mapper.sizes.length; u < h; ++u) {
                        var t = Mapper.sizes[u];
                        q = Line(o[0] * t[0] / 100, o[1] * t[1] / 100, g.lines[f][0] * t[0] / 100, g.lines[f][1] * t[1] / 100, g.type);
                        q.className += " " + t[2];
                        ae(this.floorPins[c], q)
                    }
                }
            }
        }
        this.onPinUpdate && this.onPinUpdate(this)
    },
    getLink: function() {
        var c = "";
        for (var b in this.pins) {
            if (!this.pins[b].free && this.pins[b].floor == this.level) {
                c += (this.pins[b].x < 10 ? "0" : "") + (this.pins[b].x < 1 ? "0" : "") + (this.pins[b].x * 10).toFixed(0) + (this.pins[b].y < 10 ? "0" : "") + (this.pins[b].y < 1 ? "0" : "") + (this.pins[b].y * 10).toFixed(0)
            }
        }
        return (this.zone ? this.zone : "") + (Mapper.multiLevelZones[this.zone] && this.level != 0 ? "." + this.level : "") + (c ? ":" + c : "")
    },
    setLink: function(k, g, n) {
        var m = [];
        k = k.split(":");
        var h = k[0];
        var b = 0;
        if (h.indexOf(".") != -1) {
            var f = h.split(".");
            h = f[0];
            b = parseInt(f[1])
        }
        b = (n && n != -1 && !b) ? n : b;
        if (!this.setZone(h, b, g)) {
            return false
        }
        if (k.length == 2) {
            for (var c = 0; c < k[1].length; c += 6) {
                var l = k[1].substr(c, 3) / 10;
                var j = k[1].substr(c + 3, 3) / 10;
                if (isNaN(l) || isNaN(j)) {
                    break
                }
                m.push([l, j])
            }
        }
        this.setCoords(m, b);
        return true
    },
    updateMap: function(b) {
        this.parent.style.width = this.span.style.maxWidth = (this.tempWidth ? this.tempWidth : Mapper.sizes[this.zoom][0]) + "px";
        this.span.style.maxHeight = (this.tempHeight ? this.tempHeight : Mapper.sizes[this.zoom][1]) + "px";
        this.parent.setAttribute("data-mapsize", Mapper.sizes[this.zoom][2]);
        if (!this.editable) {
            this.parent.style.cssFloat = this.parent.style.styleFloat = "left"
        }
        if (this.zone == "0") {
            this.span.style.background = "black"
        } else {
            var f = this.level;
            var c = this.zone + (f ? "-" + f : "");
            if (Mapper.garrisonLevelsToMapTiers[this.zone] && Mapper.garrisonLevelsToMapTiers[this.zone][f]) {
                c = this.zone + "__" + Mapper.garrisonLevelsToMapTiers[this.zone][f]
            } else {
                if (Mapper.multiLevelZones[this.zone]) {
                    c = Mapper.multiLevelZones[this.zone][f]
                }
            }
            this.setMap(c, f);
            if (!this.floorButton && Mapper.multiLevelZones[this.zone] && Mapper.multiLevelZones[this.zone].length > 1) {
                this.floorButton = _ = g_createButton((Mapper.zonePhased[this.zone] ? LANG.mapper_phase : LANG.mapper_floor));
                _.menu = this.getFloorsMenu();
                if (_.menu && _.menu.length) {
                    Menu_.add(_, _.menu, {
                        showAtElement: true
                    })
                }
                _.style["float"] = "right";
                ns(_);
                this.buttonDiv.appendChild(_)
            } else {
                if (this.floorButton) {
                    this.floorButton.style.display = Mapper.multiLevelZones[this.zone] ? "" : "none"
                }
            }
        }
        if (this.sToggle) {
            this.sToggle.style.display = (this.toggle && this.nCoords ? "" : "none")
        }
        $(".line", this.floorPins[f]).hide();
        $(".line." + Mapper.sizes[this.zoom][2], this.floorPins[f]).show();
        this.onMapUpdate && this.onMapUpdate(this)
    },
    cleanPin: function(c, f) {
        var b = this.pins[c];
        b.style.display = "";
        b.free = false;
        b.className = "pin";
        b.a.onmousedown = rf;
        b.a.onmouseup = rf;
        b.a.href = "javascript:;";
        b.a.style.cursor = "default";
        b.floor = f;
        return b
    },
    getPin: function(g) {
        for (var f = 0; f < this.pins.length; ++f) {
            if (this.pins[f].free) {
                return this.cleanPin(f, g)
            }
        }
        var c = ce("div"),
            b = ce("a");
        c.className = "pin";
        c.appendChild(b);
        c.a = b;
        c.floor = g;
        aE(b, "mouseover", this.pinOver);
        aE(b, "mouseout", Tooltip.hide);
        b.onclick = sp;
        this.pins.push(c);
        this.cleanPin(this.pins.length - 1, g);
        if (!this.floorPins[g]) {
            this.floorPins[g] = ce("div");
            this.floorPins[g].style.display = this.show ? "" : "none";
            if (g == this.level) {
                ae(this.span, this.floorPins[g])
            }
        }
        ae(this.floorPins[g], c);
        return c
    },
    addPin: function(c) {
        c = $E(c);
        if (c._button >= 2) {
            return
        }
        this.getMousePos(c);
        var b = this.getPin(this.level);
        b.x = this.mouseX;
        b.y = this.mouseY;
        b.style.left = b.x.toFixed(1) + "%";
        b.style.top = b.y.toFixed(1) + "%";
        b.a.onmouseup = this.delPin.bind(this, b);
        b.a.tt = b.x.toFixed(1) + ", " + b.y.toFixed(1);
        this.onPinUpdate && this.onPinUpdate(this);
        return false
    },
    delPin: function(b, c) {
        c = $E(c);
        b.style.display = "none";
        b.free = true;
        sp(c);
        this.onPinUpdate && this.onPinUpdate(this);
        return
    },
    pinOver: function() {
        Tooltip.show(this, this.tt, 4, 0)
    },
    getMousePos: function(f) {
        f = $E(f);
        var g = ac(this.parent);
        var b = g_getScroll();
        this.mouseX = Math.floor((f.clientX + b.x - g[0] - 3) / Mapper.sizes[this.zoom][0] * 1000) / 10;
        this.mouseY = Math.floor((f.clientY + b.y - g[1] - 3) / Mapper.sizes[this.zoom][1] * 1000) / 10;
        if (this.mouseX < 0) {
            this.mouseX = 0
        } else {
            if (this.mouseX > 100) {
                this.mouseX = 100
            }
        }
        if (this.mouseY < 0) {
            this.mouseY = 0
        } else {
            if (this.mouseY > 100) {
                this.mouseY = 100
            }
        }
        if (this.mouse) {
            g_setTextNodes(this.sMouse, "(" + this.mouseX.toFixed(1) + ", " + this.mouseY.toFixed(1) + ")")
        }
    }
};
//var g_zone_areas = {};
var MapViewer = new function() {
    var j, v, B, c, w, g, o, m, z, f, p, b, r, y, t;

    function l() {
        var C = Math.max(50, Math.min(618, g_getWindowSize().h - 72));
        c = 1;
        B = 1;
        if (c > 1) {
            c = 1
        }
        if (B > 1) {
            B = 1
        }
        j = Math.round(B * 772);
        v = Math.round(B * 515);
        var D = Math.max(480, j);
        Lightbox.setSize(D + 20, v + 52)
    }

    function h(C) {
        var D = function(G, F) {
            F += ":" + G.zone;
            if (G.level) {
                F += "." + G.level
            }
            return F
        };
        var E = "#map";
        if (f) {
            E += "=" + w.getLink()
        } else {
            if (Mapper.zoneDefaultLevel[w.zone]) {
                if (Mapper.zoneDefaultLevel[w.zone] != w.level) {
                    E = D(w, E)
                }
            } else {
                if (w.level != 0) {
                    E = D(w, E)
                } else {
                    if ((!isset("g_mapperData") || !g_mapperData[w.zone]) && (!isset("g_mapper_data") || !g_mapper_data[w.zone])) {
                        E = D(w, E)
                    }
                }
            }
        }
        return E
    }

    function u() {
        if (o) {
            o(w)
        }
        location.replace(h(true))
    }

    function s(C) {
        if (C && (B == c) && g_getWindowSize().h > b.offsetHeight) {
            return
        }
        b.style.visibility = "hidden";
        l(0);
        if (!C) {
            if (!p) {
                p = ce("div");
                p.style.height = "325px";
                p.style.padding = "3px";
                p.style.marginTop = "10px"
            }
            w.parent.style.borderWidth = "0px";
            w.parent.style.marginTop = "0px";
            w.span.style.cursor = "pointer";
            if (w.span.onclick) {
                g = w.span.onclick
            }
            w.span.onclick = Lightbox.hide;
            w.span.onmouseover = function() {
                t.style.display = "block"
            };
            w.span.onmouseout = function() {
                setTimeout(function() {
                    if (!t.hasMouse) {
                        t.style.display = "none"
                    }
                }, 10)
            };
            if (w.onMapUpdate) {
                o = w.onMapUpdate
            }
            w.onMapUpdate = u;
            if (!f) {
                m = w.parent.parentNode;
                z = w.parent.nextSibling;
                m.insertBefore(p, w.parent);
                de(w.parent);
                ae(y, w.parent)
            } else {
                de(f);
                ae(y, f)
            }
            if (location.hash.indexOf("#show") == -1) {
                location.replace(h(false))
            } else {
                if (isset("mapShower")) {
                    mapShower.onExpand()
                }
            }
        }
        Lightbox.reveal();
        b.style.visibility = "visible"
    }

    function k() {
        s(1)
    }

    function q() {
        if (g) {
            w.span.onclick = g
        } else {
            w.span.onclick = null
        }
        g = null;
        if (o) {
            w.onMapUpdate = o
        } else {
            w.onMapUpdate = null
        }
        o = null;
        w.span.style.cursor = "";
        w.span.onmouseover = null;
        w.span.onmouseout = null;
        if (!f) {
            de(p);
            de(w.parent);
            w.parent.style.borderWidth = "";
            w.parent.style.marginTop = "";
            if (z) {
                m.insertBefore(w.parent, z)
            } else {
                ae(m, w.parent)
            }
            m = z = null
        } else {
            de(f);
            f = null
        }
        w.toggleZoom();
        if (location.hash.indexOf("#show") == -1) {
            g_clearHash()
        } else {
            if (isset("mapShower")) {
                mapShower.onCollapse()
            }
        }
    }

    function A(D, F, E) {
        w = E.mapper;
        b = D;
        if (F) {
            D.className += " mapviewer";
            r = ce("div");
            r.style.width = "772px";
            r.style.height = "515px";
            r.className = "lightbox-content mapviewer-screen";
            t = ce("a");
            t.className = "mapviewer-cover";
            t.href = "javascript:;";
            t.onclick = Lightbox.hide;
            t.onmouseover = function() {
                t.hasMouse = true
            };
            t.onmouseout = function() {
                t.hasMouse = false
            };
            var H = ce("span");
            var C = ce("b");
            ae(C, ct(LANG.close));
            ae(H, C);
            ae(t, H);
            ae(r, t);
            y = ce("div");
            ae(r, y);
            ae(D, r);
            var G = ce("a");
            G.className = "dialog-x fa fa-times";
            G.href = "javascript:;";
            G.onclick = Lightbox.hide;
            ae(G, ct(LANG.close));
            ae(D, G)
        }
        n()
    }

    function n() {
        s()
    }
    this.checkPound = function() {
        if (location.hash && location.hash.indexOf("#map") == 0) {
            var G = location.hash.split("=");
            if (G.length == 2) {
                var E = G[1];
                if (E) {
                    MapViewer.show({
                        link: E
                    })
                }
            } else {
                G = location.hash.split(":");
                var F = ge("sjdhfkljawelis");
                if (F) {
                    F.onclick()
                }
                if (G.length == 2) {
                    if (!F) {
                        MapViewer.show({
                            link: G[1]
                        })
                    }
                    var C = G[1].split(".");
                    var D = {
                        zone: C[0]
                    };
                    if (C.length == 2) {
                        D.level = parseInt(C[1]) + 1
                    }
                    w.update(D)
                }
            }
        }
    };
    this.show = function(C) {
        //g_trackEvent("Zone Maps", "Show", (C.link ? C.link : "General"));
        if (C.link) {
            f = ce("div");
            f.id = "fewuiojfdksl";
            ae(document.body, f);
            var D = new Mapper({
                parent: f.id
            });
            D.setLink(C.link, true);
            D.toggleZoom()
        } else {
            Lightbox.show("mapviewer", {
                onShow: A,
                onHide: q,
                onResize: k
            }, C)
        }
    };
    $(document).ready(this.checkPound)
};
var ShowOnMap = function(f, g, c) {
    var b = this;
    b.data = f;
    b.currentPath = [];
    if (g == null) {
        g = myMapper
    }
    b.mapper = g;
    b._legend = null;
    b._legendLabel = null;
    b._legendContents = null;
    b._legendHorde = null;
    b._legendAlliance = null;
    b._menu = [];
    b._trackingIcons = [];
    b._controlsdiv = c ? $(typeof c == "string" ? ("#" + c) : c) : $("#lenrlkn4");
    b.construct()
};
ShowOnMap.prototype.onExpand = function() {
    this.expanded = true;
    location.replace(this.pound + ".map")
};
ShowOnMap.prototype.onCollapse = function() {
    this.expanded = false;
    var b = g_getHash();
    if (b.indexOf("#show") == 0 && b.indexOf(".map") > 0) {
        this.pound = b.substr(0, b.indexOf(".map"));
        location.replace(this.pound)
    }
};
ShowOnMap.prototype.construct = function() {
    if (!this.data) {
        return
    }
    var ae = this._controlsdiv;
    var c = function(m, l) {
        return strcmp(m[1], l[1])
    };
    var J = [];
    var aa = [];
    for (var Z in this.data) {
        if (this.data[Z].length === undefined) {
            var j = [];
            var k = [];
            var L = {};
            var C = this.data[Z];
            for (var S in C) {
                var b = false;
                for (var W = 0, A = C[S].length; W < A; ++W) {
                    if (C[S][W].paths) {
                        b = true;
                        break
                    }
                }
                var o = g_urlize(S);
                if (C[S][0].name_enus !== undefined) {
                    o = g_urlize(C[S][0].name_enus)
                }
                var O = {};
                var r = {};
                var H = [o];
                var h = ShowOnMap.combinePins(C[S], false, b);
                var N = h[0];
                var F = h[1];
                var ag = 0;
                for (var W = 0; W < N.length; ++W) {
                    var I = N[W];
                    var t = ShowOnMap.buildTooltip(I.list);
                    var f = t[2];
                    var X = null;
                    if (f == "javascript:;") {
                        X = t[3]
                    }
                    if (I.list.length == 1) {
                        f = (g_types[I.list[0].type] && I.list[0].id ? "/" + g_types[I.list[0].type] + "=" + I.list[0].id : "")
                    }
                    if (Z == "rare" || Z == "herb" || Z == "vein") {
                        t[1] = j.length + 1
                    }
                    if (O[I.level] == undefined) {
                        O[I.level] = []
                    }
                    O[I.level].push([I.coord[0], I.coord[1], {
                        url: f,
                        label: t[0],
                        menu: X,
                        type: t[1],
                        lines: I.list[0].paths
                    }]);
                    ag++
                }
                if (ag > 0) {
                    var f = (g_types[C[S][0].type] && C[S][0].id ? "/" + g_types[C[S][0].type] + "=" + C[S][0].id : "");
                    r[j.length + 1] = [S, f];
                    H.push(S + sprintf(LANG.qty, F));
                    H.push(this.showStuff.bind(this, O, [Z, o], r));
                    j.push(H);
                    for (var Y in O) {
                        if (k[Y]) {
                            k[Y] = k[Y].concat(O[Y])
                        } else {
                            k[Y] = O[Y]
                        }
                    }
                    L[j.length] = [S, f]
                }
            }
            if (j.length > 0) {
                j.sort(c);
                var H = [Z, LANG.som[Z], this.showStuff.bind(this, k, [Z], L), j];
                this._menu.push(H);
                var y = [
                    [null, LANG.som[Z]],
                    ["all", LANG.som.all, H[2]]
                ];
                for (x = 0; x < j.length; x++) {
                    y.push(j[x])
                }
                this._trackingIcons.push([Z, undefined, L, y])
            }
        } else {
            if (this.data[Z].length == 0) {
                continue
            }
            var b = false;
            for (var W = 0, A = this.data[Z].length; W < A; ++W) {
                if (this.data[Z][W].paths) {
                    b = true;
                    break
                }
            }
            var H = [Z];
            var O = {};
            var T = {},
                D = {};
            var q = {},
                s = {};
            var r = {};
            var u = {};
            var M = {};
            var h = ShowOnMap.combinePins(this.data[Z], false, b);
            var F = h[1];
            var ag = 0,
                g = 0,
                G = 0,
                R = 0,
                ad = 0;
            var w = function(ah, ak) {
                for (var ai = 0; ai < ak.length; ++ai) {
                    var l = ak[ai];
                    var an = ah;
                    l.list.key = Z;
                    var am = ShowOnMap.buildTooltip(l.list, (ah == "hordedailyquests" || ah == "alliancedailyquests") ? true : false);
                    var p = am[2];
                    var aj = null;
                    if (p == "javascript:;") {
                        aj = am[3]
                    }
                    if (l.list.length == 1) {
                        p = (g_types[l.list[0].type] && l.list[0].id ? "/" + g_types[l.list[0].type] + "=" + l.list[0].id : "")
                    }
                    var al = [l.coord[0], l.coord[1], {
                        url: p,
                        label: am[0],
                        menu: aj,
                        type: am[1],
                        lines: l.list[0].paths
                    }];
                    if (O[l.level] == undefined) {
                        O[l.level] = [];
                        T[l.level] = [];
                        D[l.level] = [];
                        q[l.level] = [];
                        s[l.level] = []
                    }
                    if (l.list[0].mapicon) {
                        al[2].mapicon = l.list[0].mapicon
                    }
                    if (an != "mailbox" && an != "vignettes" && an != "rare" && an != "spirithealer" && an != "book" && an != "forge" && an != "treasure" && an != "anvil" && an != "hordequests" && an != "alliancequests" && an != "hordedailyquests" && an != "alliancedailyquests" && an != "boss") {
                        if (am[1] == 2 || am[1] == 0) {
                            if (am[1] == 2) {
                                u[2] = [LANG.som_legend_horde, null]
                            } else {
                                u[0] = [LANG.som_legend_neutral, null]
                            }
                            T[l.level].push(al);
                            g++
                        }
                        if (am[1] == 3 || am[1] == 0) {
                            if (am[1] == 3) {
                                M[3] = [LANG.som_legend_alliance, null]
                            } else {
                                M[0] = [LANG.som_legend_neutral, null]
                            }
                            q[l.level].push(al);
                            R++
                        }
                    } else {
                        if (an == "hordequests") {
                            an = "quest";
                            if (am[1] == 2) {
                                u[2] = [LANG.som_legend_horde, null]
                            } else {
                                u[0] = [LANG.som_legend_neutral, null]
                            }
                            T[l.level].push(al);
                            g++
                        } else {
                            if (an == "hordedailyquests") {
                                an = "daily";
                                if (am[1] == 2) {
                                    u[2] = [LANG.som_legend_horde, null]
                                } else {
                                    u[0] = [LANG.som_legend_neutral, null]
                                }
                                D[l.level].push(al);
                                G++
                            } else {
                                if (an == "alliancequests") {
                                    an = "quest";
                                    if (am[1] == 3) {
                                        M[3] = [LANG.som_legend_alliance, null]
                                    } else {
                                        M[0] = [LANG.som_legend_neutral, null]
                                    }
                                    q[l.level].push(al);
                                    R++
                                } else {
                                    if (an == "alliancedailyquests") {
                                        an = "daily";
                                        if (am[1] == 3) {
                                            M[3] = [LANG.som_legend_alliance, null]
                                        } else {
                                            M[0] = [LANG.som_legend_neutral, null]
                                        }
                                        s[l.level].push(al);
                                        ad++
                                    } else {
                                        O[l.level].push(al);
                                        ag++
                                    }
                                }
                            }
                        }
                    }
                }
                return an
            };
            var ac = w(Z, h[0]);
            if (Z == "alliancequests") {
                var B = ShowOnMap.combinePins(this.data[Z], true);
                if (B[1] > 0) {
                    w("alliancedailyquests", B[0])
                }
            } else {
                if (Z == "hordequests") {
                    var P = ShowOnMap.combinePins(this.data[Z], true);
                    if (P[1] > 0) {
                        w("hordedailyquests", P[0])
                    }
                }
            }
            if (ac == "rare") {
                F = this.data[ac].length
            } else {
                if (ac == "forge" || ac == "anvil" || ac == "treasure" || ac == "mailbox") {
                    F = h[0].length
                }
            }
            if (ag > 0) {
                var H = [ac, LANG.som[ac] + sprintf(LANG.qty, F), this.showStuff.bind(this, O, [ac], r)];
                this._menu.push(H);
                this._trackingIcons.push([ac, O, r])
            }
            if (g > 0) {
                var H = [ac, LANG.som[ac] + sprintf(LANG.qty, g), this.showStuff.bind(this, T, ["horde", ac], u), null];
                if (ac == "quest") {
                    H.push({
                        tinyIcon: "quest_start"
                    });
                    if (G > 0) {
                        aa.push(H);
                        H = ["daily", LANG.som.daily + sprintf(LANG.qty, G), this.showStuff.bind(this, D, ["horde", "daily"], u), null, {
                            tinyIcon: "quest_start_daily"
                        }];
                        this._trackingIcons.push(["daily", D, u])
                    }
                }
                aa.push(H);
                this._trackingIcons.push([ac, T, u])
            }
            if (R > 0) {
                var H = [ac, LANG.som[ac] + sprintf(LANG.qty, R), this.showStuff.bind(this, q, ["alliance", ac], M), null];
                if (ac == "quest") {
                    H.push({
                        tinyIcon: "quest_start"
                    });
                    if (ad > 0) {
                        J.push(H);
                        H = ["daily", LANG.som.daily + sprintf(LANG.qty, ad), this.showStuff.bind(this, s, ["alliance", "daily"], M), null, {
                            tinyIcon: "quest_start_daily"
                        }];
                        this._trackingIcons.push(["daily", s, M])
                    }
                }
                J.push(H);
                this._trackingIcons.push([ac, q, M])
            }
        }
    }
    J.sort(c);
    aa.sort(c);
    this._menu.sort(c);
    if (aa.length > 0) {
        this._menu.unshift(["horde", LANG.som.horde, "", aa, {
            tinyIcon: "side_horde"
        }])
    }
    if (J.length > 0) {
        this._menu.unshift(["alliance", LANG.som.alliance, "", J, {
            tinyIcon: "side_alliance"
        }])
    }
    var z = [-1, LANG.som_nothing, this.showStuff.bind(this, [], [-1], {})];
    z.checked = true;
    this._menu.push(z);
    var v = g_createButton(LANG.showonmap, null, {
        "class": "mapper-som-button fa fa-search"
    });
    Menu_.add(v, this._menu, {
        showAtElement: true
    });
    ae.append(v);
    var K;
    if (!this._legend) {
        this._legend = $("<div/>", {
            "class": "mapper-legend",
            css: {
                display: "none"
            }
        });
        var V = $("<div/>", {
            "class": "mapper-legend-container"
        });
        this._legendLabel = $("<b/>", {
            text: LANG.som_legend
        });
        V.append(this._legendLabel);
        this._legendContents = $("<div/>", {
            css: {
                "float": "right"
            }
        });
        V.append(this._legendContents);
        var K = $("<div/>", {
            css: {
                clear: "right"
            }
        });
        V.append(K);
        this._legend.append(V)
    }
    ae.append(this._legend);
    K = $("<div/>", {
        css: {
            clear: "left"
        }
    });
    ae.append(K);
    this.setTrackingIcons();
    var E = [];
    var U = g_getHash();
    if (U.indexOf("#show:") != -1) {
        E = U.split(".")
    } else {
        if (this.data.instance) {
            E.push("#show:boss")
        }
    }
    if (E.length > 0) {
        if (E.length == 2 && E[1] == "map") {
            this.expanded = true;
            this.mapper.toggleZoom()
        }
        var Q = E[0].split(":");
        if (Q.length < 2) {
            return
        }
        var ab = this._menu;
        for (var W = 1; W < Q.length; ++W) {
            var af = Q.length - 1;
            for (var S = 0; S < ab.length; ++S) {
                if (ab[S][0] == Q[W]) {
                    if (ab[S][3] && W < af) {
                        ab = ab[S][3]
                    } else {
                        ab = ab[S]
                    }
                    break
                }
            }
        }
        if (ab && ab[2] && jQuery.isFunction(ab[2])) {
            ab[2]()
        }
    }
};
ShowOnMap.prototype.setTrackingIcons = function() {
    var c = this.mapper.parent;
    var C = {
        repair: "repair",
        auctioneer: "auctioneer",
        banker: "banker",
        battlemaster: "battlemaster",
        innkeeper: "inn",
        guildmaster: "guild",
        stablemaster: "stablemaster",
        flightmaster: "flightmaster",
        trainer: "trainer-profession",
        vendor: "vendor-food",
        quest: "quest",
        daily: "daily",
        anvil: "blacksmithing",
        herb: "herbalism",
        vein: "mining",
        book: "trainer-class",
        forge: "smelting",
        spirithealer: "spirithealer",
        boss: "boss",
        rare: "hostile-npc",
        vignettes: "resource",
        treasure: "treasure",
        mailbox: "mailbox"
    };
    var f = [{
        name: LANG.types[1][2],
        icons: ["repair", "auctioneer", "banker", "battlemaster", "innkeeper", "guildmaster", "stablemaster", "flightmaster", "trainer", "vendor", "spirithealer", "boss", "rare"],
        elements: []
    }, {
        name: LANG.types[5][2],
        icons: ["quest", "daily"],
        elements: []
    }, {
        name: l_guide_categories[2],
        icons: ["anvil", "herb", "vein", "book", "forge"],
        elements: []
    }, {
        name: LANG.loot,
        icons: ["vignettes", "treasure"],
        elements: []
    }, {
        name: LANG.other,
        icons: ["mailbox"],
        elements: []
    }];
    var b = this._trackingIcons;
    b.sort(function(k, j) {
        return strcmp(k[0], j[0])
    });
    for (var v = 1; v < b.length; v++) {
        if (b[v][0] == b[v - 1][0]) {
            var s = {};
            for (var w in b[v][1]) {
                if (!b[v][1].hasOwnProperty(w)) {
                    continue
                }
                s[w] = b[v][1][w]
            }
            for (w in b[v - 1][1]) {
                if (!b[v - 1][1].hasOwnProperty(w)) {
                    continue
                }
                if (!s.hasOwnProperty(w)) {
                    s[w] = b[v - 1][1][w]
                } else {
                    s[w] = s[w].concat(b[v - 1][1][w])
                }
            }
            b[v - 1][1] = s;
            var E = {};
            for (var h in b[v][2]) {
                if (!b[v][2].hasOwnProperty(h)) {
                    continue
                }
                E[h] = b[v][2][h]
            }
            for (h in b[v - 1][2]) {
                if (!b[v - 1][2].hasOwnProperty(h)) {
                    continue
                }
                E[h] = b[v - 1][2][h]
            }
            b[v - 1][2] = E;
            b.splice(v--, 1)
        }
    }
    b.sort(function(k, j) {
        return strcmp(LANG.som[k[0]], LANG.som[j[0]])
    });
    var p = ce("div", {
        className: "mapper-legend-icons"
    });
    for (var F = 0, u; u = b[F]; F++) {
        if (!C.hasOwnProperty(u[0])) {
            continue
        }
        var B = ce("div");
        B.className = "mapper-legend-icon " + C[u[0]];
        B.setAttribute("data-legend-icon", u[0]);
        B.onmousedown = rf;
        if (u[1]) {
            var t = [u[0]];
            if (u[0] != "vignettes" && u[0] != "treasure") {
                t.splice(0, 0, -2)
            }
            aE(B, "click", this.showStuff.bind(this, u[1], t, u[2], B))
        }
        if (u[3]) {
            Menu_.add(B, u[3], {
                showAtElement: true
            })
        }
        if (!Platform.isTouch()) {
            Tooltip.simple(B, LANG.som[u[0]])
        }
        var o = false;
        for (var D = 0, q; q = f[D]; D++) {
            if (q.icons.indexOf(u[0]) > -1) {
                o = true;
                f[D].elements.push(B);
                break
            }
        }
        if (!o) {
            if (typeof console != "undefined" && typeof console.error == "function") {
                console.error("Could not find group for " + u[0] + " icon!")
            }
        }
    }
    for (var A = 0, H; H = f[A]; A++) {
        if (H.elements.length) {
            var n = ce("div", {
                className: "mapper-legend-icons-group"
            });
            var g = ce("div", {
                className: "mapper-legend-icons-heading",
                innerHTML: H.name
            });
            var I = ce("div", {
                className: "mapper-legend-icons-icons"
            });
            if (H.style) {
                for (var z in H.style) {
                    if (H.style.hasOwnProperty(z)) {
                        n.style[z] = H.style[z]
                    }
                }
            }
            for (var y = 0, G; G = H.elements[y]; y++) {
                ae(I, G)
            }
            ae(n, g);
            ae(n, I);
            ae(p, n)
        }
    }
    var r = ce("div", {
        className: "mapper-legend-icons-tip",
        innerHTML: LANG.mapper_clickicon
    });
    //$("> span:first-child", this.mapper.parent).append(r);
    //ae(c, p);
    c.className += " mapper-autoheight"
};
ShowOnMap.prototype.setLegend = function(h) {
    this._legendContents.empty();
    var j = $("<div/>");
    var f = 0;
    for (var c in h) {
        var g = $("<span/>", {
            "class": ("mapper-pin mapper-pin-" + c + " mapper-legend-pin")
        });
        if (h[c][1]) {
            var b = $("<a/>", {
                href: h[c][1],
                text: h[c][0]
            });
            g.append(b)
        } else {
            g.text(h[c][0])
        }
        j.append(g);
        if ((++f) % 4 == 0) {
            j.append($("<br/>"))
        }
    }
    this._legendContents.append(j)
};
ShowOnMap.prototype.showStuff = function(b, k, f) {
    if (g_isEqualSimpleObject(k, this.currentPath)) {
        this.showStuff.call(this, [], [-1], {});
        return
    }
    Menu_.hide();
    var h = false;
    for (var c = 0, g; g = k[c]; c++) {
        if (typeof g != "string") {
            continue
        }
        var j = $('[data-legend-icon="' + g + '"]');
        if (j.length) {
            j.parents(".mapper-legend-icons").find(".mapper-legend-icon").removeClass("active");
            j.addClass("active");
            h = true;
            break
        }
    }
    if (!h) {
        $(".mapper-legend-icon", this.mapper.parent).removeClass("active")
    }
    var l = {
        coords: b,
        preservelevel: true
    };
    if ((typeof g_pageInfo != "undefined") && g_pageInfo.hasOwnProperty("id")) {
        l.zone = g_pageInfo.id
    }
    this.mapper.update(l);
    this.setLegend(f);
    this.checkMenu(k);
    this.currentPath = k;
    if ((k.length == 1 && k[0] == -1) || (k[0] == -2)) {
        this.pound = "";
        g_clearHash();
        return
    }
    this.pound = "#show:" + k.join(":");
    if (this.pound != "#show:boss") {
        location.replace(this.pound + (this.expanded ? ".map" : ""))
    }
};
ShowOnMap.prototype.clearChecks = function(c) {
    for (var b = 0; b < c.length; ++b) {
        c[b].checked = false;
        if (c[b][3] && c[b][3].length > 0) {
            this.clearChecks(c[b][3])
        }
    }
    this._legend.hide()
};
ShowOnMap.prototype.checkMenu = function(n) {
    this.clearChecks(this._menu);
    if (n[0] != -1) {
        this._legend.show()
    } else {
        this._legend.hide()
    }
    var b = this._menu;
    var l = [];
    for (var f = 0; f < n.length; ++f) {
        for (var c = 0; c < b.length; ++c) {
            if (b[c][0] == n[f]) {
                b[c].checked = true;
                l.push([b[c][0], b[c][1]]);
                b = b[c][3];
                break
            }
        }
    }
    if (n[0] == -2) {
        l.push([n[1], LANG.som[n[1]]])
    }
    var g = l.length - 1;
    var k = "";
    var h = {
        rare: true,
        herb: true,
        vein: true
    };
    for (var f = 0; f < l.length; ++f) {
        if (f > 0 && h[l[0][0]]) {
            var m = $("span", this._legendContents);
            m.removeClass("mapper-legend-pin");
            m.append($("<b/>", {
                text: " " + l[f][1].substr(l[f][1].lastIndexOf("("))
            }))
        } else {
            if (f == g) {
                k += "<span>"
            } else {
                k += '<span class="breadcrumb-arrow">'
            }
            k += l[f][1] + "</span>"
        }
    }
    this._legendLabel.html(k)
};
ShowOnMap.combinePins = function(u, o, h) {
    var g = {};
    var s = null,
        b = null;
    var m, l;
    var w = 0;
    var f = function(C, n) {
        var c = Math.floor(C[0]);
        var p = Math.floor(C[1]);
        if (!n) {
            if (c % 2 == 1) {
                c += 1
            }
            if (p % 2 == 1) {
                p += 1
            }
        }
        if (g[c] === undefined) {
            g[c] = {}
        }
        if (g[c][p] === undefined) {
            g[c][p] = []
        }
        return [c, p]
    };
    for (var q = 0; q < u.length; ++q) {
        var j = u[q];
        if (o) {
            if (!j.quests) {
                continue
            }
            var t = true;
            for (var r = 0; r < j.quests.length; ++r) {
                if (j.quests[r].daily) {
                    t = false;
                    break
                }
            }
            if (t) {
                continue
            }
        } else {
            if (h) {
                s = f([j.id, 0], true);
                m = s[0];
                l = s[1];
                var k = dO(j);
                k.coord = j.coords[0];
                g[m][l].push(k);
                w++;
                continue
            }
        }
        if (j.point == "start" || j.point == "end") {
            s = f(j.coord);
            m = s[0];
            l = s[1];
            if (g[m][l].length > 3) {
                var z = g[m][l];
                g[m][l] = [];
                for (var v = 0; v < z.length; ++v) {
                    b = f(z[v].coord, true);
                    g[b[0]][b[1]].push(z[v])
                }
            }
            g[m][l].push(j);
            w++
        } else {
            for (var A = 0; A < j.coords.length; ++A) {
                s = f(j.coords[A]);
                m = s[0];
                l = s[1];
                var k = dO(j);
                k.coord = j.coords[A];
                if (g[m][l].length > 3) {
                    var z = g[m][l];
                    g[m][l] = [];
                    for (var v = 0; v < z.length; ++v) {
                        b = f(z[v].coord, true);
                        g[b[0]][b[1]].push(z[v])
                    }
                }
                g[m][l].push(k);
                w++
            }
        }
    }
    var B = [];
    for (m in g) {
        for (l in g[m]) {
            B.push({
                coord: [g[m][l][0].coord[0], g[m][l][0].coord[1]],
                level: g[m][l][0].level,
                list: g[m][l]
            })
        }
    }
    return [B, w]
};
ShowOnMap.buildTooltip = function(y, p) {
    var u = "";
    var g = "";
    var c = [];
    var r = -1;
    var j = {};
    var h = 0;
    var b = {};
    var z = 1;
    for (var t = 0; t < y.length; ++t) {
        var k = y[t];
        g = (g_types[k.type] && k.id ? "/" + g_types[k.type] + "=" + k.id : "");
        var B = g + k.item;
        var l = g + k.point;
        if (!j[B]) {
            j[B] = {
                url: g,
                obj: k,
                coords: [k.coord],
                all: [k]
            };
            h++
        } else {
            if (!b[l]) {
                j[B].all.push(k)
            }
            j[B].coords.push(k.coord)
        }
        b[l] = 1
    }
    var t = 0;
    for (var B in j) {
        var g = j[B].url;
        var f = j[B].all;
        var k = j[B].obj;
        var w = j[B].coords;
        if (t > 0) {
            u += "<br />"
        }
        c.push([t++, k.name, g]);
        z = k.type;
        if (!k.point) {
            if ((k.reacthorde == 1 && k.reactalliance < 1) || k.side == 2) {
                if (r == 2 || r == -1) {
                    r = 2
                } else {
                    r = 0
                }
            } else {
                if ((k.reactalliance == 1 && k.reacthorde < 1) || k.side == 1) {
                    if (r == 3 || r == -1) {
                        r = 3
                    } else {
                        r = 0
                    }
                } else {
                    r = 0
                }
            }
        }
        u += '<b class="q' + (r == 2 ? " icon-horde" : "") + (r == 3 ? " icon-alliance" : "") + '">' + k.name + "</b>";
        if (w.length > 0) {
            u += " (" + w[0][0] + ", " + w[0][1] + ")<br />"
        }
        if (k.quests) {
            if (k.quests.length > 1) {
                u += LANG.som_startsquestpl
            } else {
                u += LANG.som_startsquest
            }
            u += '<div class="indent">';
            for (var m = 0; m < k.quests.length; ++m) {
                var v = k.quests[m];
                if (p && !v.daily) {
                    continue
                }
                u += '<span class="q0">[' + v.level + "]</span> " + v.name + ((v.series && !v.first) ? '<sup style="font-size: 8px">(*)</sup>' : "") + ((v.category < 0 && g_quest_sorts[v.category]) ? ' <i class="q0">' + g_quest_sorts[v.category] + "</i>" : "") + "<br />"
            }
            u += "</div>"
        } else {
            if (k.description) {
                u += k.description + "<br />"
            } else {
                if (k.point) {
                    for (var t = 0; t < f.length; ++t) {
                        var s = f[t];
                        switch (s.point) {
                            case "start":
                                u += LANG.mapper_startsquest + "<br />";
                                if (r == "end") {
                                    r = "startend"
                                } else {
                                    if (r != "startend") {
                                        r = "start"
                                    }
                                }
                                break;
                            case "end":
                                u += LANG.mapper_endsquest + "<br />";
                                if (r == "start") {
                                    r = "startend"
                                } else {
                                    if (r != "startend") {
                                        r = "end"
                                    }
                                }
                                break;
                            case "sourcestart":
                                u += LANG.mapper_sourcestart + "<br />";
                                u += '<div class="indent">' + s.item + "</div>";
                                if (r == "end") {
                                    r = "startend"
                                } else {
                                    if (r != "startend") {
                                        r = "start"
                                    }
                                }
                                break;
                            case "sourceend":
                                u += LANG.mapper_sourceend + "<br />";
                                u += '<div class="indent">' + s.item + "</div>";
                                if (r == "start") {
                                    r = "startend"
                                } else {
                                    if (r != "startend") {
                                        r = "end"
                                    }
                                }
                                break;
                            case "requirement":
                                u += LANG.mapper_requiredquest + "<br />";
                                if (r == -1) {
                                    r = s.objective
                                }
                                break;
                            case "sourcerequirement":
                                u += LANG.mapper_sourcereq + "<br />";
                                u += '<div class="indent">' + s.item + "</div>";
                                if (r == -1) {
                                    r = s.objective
                                }
                                break
                        }
                    }
                }
            }
        }
    }
    u += '<div class="q2">';
    if (y.length == 1) {
        u += (y[0].type == 1 ? LANG.som_viewnpc : (y[0].type == 2 ? LANG.som_viewobj : ""))
    } else {
        if (h == 1) {
            u += (z == 1 ? LANG.som_viewnpc : (z == 2 ? LANG.som_viewobj : ""))
        } else {
            u += "<br />" + LANG.som_view
        }
    }
    u += "</div>";
    var A = [];
    A.push(u);
    A.push(r);
    if (y.length == 1 || h == 1) {
        A.push(g);
        A.push(null)
    } else {
        A.push("javascript:;");
        A.push(c)
    }
    return A
};

Mapper.multiLevelZones = {
    "0":["0-0","0_1"],
    "1":["1-0","1-6","1-7","1-10","1-11"],
    "3":["3-0","3-18"],
    "12":["12-0","12-1","12-2","12-19"],
    "14":["14-0","14-8","14-10","14-11","14-12","14-19"],
    "17":["17-0","17-20"],
    "34":["34-3"],
    "40":["40-0","40-4","40-5","40-17"],
    "46":["46-0","46-14","46-15","46-16"],
    "51":["51-0","51-14","51-15","51-16"],
    "54":["54-19"],
    "57":["57-1","57-2"],
    "85":["85-0","85-13"],
    "111":["111-5"],
    "113":["113-4"],
    "134":["134-11"],
    "135":["135-8"],
    "136":["136-7"],
    "141":["141-0","141-2","141-3","141-4","141-5"],
    "155":["155-12"],
    "206":["206-1","206-2","206-3"],
    "209":["209-1","209-2","209-3","209-4","209-5","209-6","209-7"],
    "215":["215-0","215-6","215-7"],
    "254":["254-14","254-15","254-16"],
    "257":["257-2"],
    "258":["258-3"],
    "262":["262-4","262-5"],
    "360":["360-7"],
    "365":["365-8"],
    "371":["371-19"],
    "372":["372-10","372-11"],
    "405":["405-0","405-21","405-22"],
    "440":["440-0","440-15","440-16","440-17","440-18"],
    "490":["490-0","490-14"],
    "491":["491-1"],
    "540":["540-14"],
    "616":["616-0","616_1","616_2"],
    "717":["717-0","717-1"],
    "718":["718-1"],
    "719":["719-1","719-2","719-3"],
    "721":["721-1","721-2","721-3","721-4"],
    "722":["722-1"],
    "796":["796-1","796-2","796-3","796-4"],
    "800":["800-6"],
    "817":["817-12"],
    "818":["818-6"],
    "981":["981-16"],
    "982":["982-15"],
    "1196":["1196-1","1196-2"],
    "1337":["1337-1","1337-2","1337-18"],
    "1377":["1377-0","1377-13"],
    "1445":["1445-14","1445-15","1445-16"],
    "1477":["1477-1"],
    "1517":["1517-18"],
    "1581":["1581-1","1581-2"],
    "1583":["1583-1","1583-2","1583-3","1583-4","1583-5","1583-6","1583-7"],
    "1584":["1584-1","1584-2"],
    "1637":["1637-0","1637-1"],
    "1977":["1977-0"],
    "2017":["2017-1","2017-2"],
    "2057":["2057-1","2057-2","2057-3","2057-4"],
    "2100":["2100-1","2100-2"],
    "2159":["2159-1"],
    "2257":["2257-1","2257-2"],
    "2268":["2268-20"],
    "2300":["2300-17","2300-18"],
    "2437":["2437-1"],
    "2557":["2557-0","2557-1","2557-2","2557-3","2557-4","2557-5","2557-6"],
    "2677":["2677-1","2677-2","2677-3","2677-4"],
    "2717":["2717-1"],
    "3428":["3428-1","3428-2","3428-3"],
    "3433":["3433-0","3433-1"],
    "3446":["3446-13"],
    "3456":["3456-1","3456-2","3456-3","3456-4","3456-5","3456-6"],
    "3457":["3457-1","3457-2","3457-3","3457-4","3457-5","3457-6","3457-7","3457-8","3457-9","3457-10","3457-11","3457-12","3457-13","3457-14","3457-15","3457-16","3457-17"],
    "3510":["3510-1"],
    "3524":["3524-0","3524-2","3524-3"],
    "3562":["3562-1"],
    "3569":["3569-2"],
    "3572":["3572-3"],
    "3607":["3607-1"],
    "3713":["3713-1"],
    "3714":["3714-1"],
    "3715":["3715-1","3715-2"],
    "3716":["3716-1"],
    "3717":["3717-1"],
    "3789":["3789-1"],
    "3790":["3790-1","3790-2"],
    "3791":["3791-1","3791-2"],
    "3792":["3792-1"],
    "3836":["3836-1"],
    "3845":["3845-1"],
    "3847":["3847-1"],
    "3848":["3848-1","3848-2","3848-3"],
    "3849":["3849-1","3849-2"],
    "3923":["3923-1"],
    "3959":["3959-0","3959-1","3959-2","3959-3","3959-4","3959-5","3959-6","3959-7"],
    "4075":["4075-0","4075-1"],
    "4100":["4100-0","4100-1","4100-2"],
    "4131":["4131-1","4131-2"],
    "4196":["4196-1","4196-2"],
    "4228":["4228-0","4228-1","4228-2","4228-3","4228-4"],
    "4264":["4264-1"],
    "4265":["4265-1"],
    "4272":["4272-1","4272-2"],
    "4273":["4273-0","4273-1","4273-2","4273-3","4273-4","4273-5"],
    "4277":["4277-1","4277-2","4277-3"],
    "4395":["4395-1","4395-2"],
    "4415":["4415-1"],
    "4416":["4416-0"],
    "4494":["4494-1","4494-2"],
    "4500":["4500-1"],
    "4603":["4603-1"],
    "4714":["4714-0","4714-1","4714-2","4714-3"],
    "4720":["4720-0","4720-1","4720-2","4720-3","4720-4","4720_1","4720_2","4720_3"],
    "4722":["4722-1","4722-2"],
    "4723":["4723-1","4723-2"],
    "4732":["4732-1"],
    "4737":["4737-0","4737-5","4737-6","4737-7"],
    "4766":["4766-5","4766-6","4766-7"],
    "4778":["4778-1"],
    "4809":["4809-1"],
    "4812":["4812-1","4812-2","4812-3","4812-4","4812-5","4812-6","4812-7","4812-8"],
    "4817":["4817-2","4817-3"],
    "4820":["4820-1"],
    "4911":["4911-2"],
    "4913":["4913-9"],
    "4922":["4922-0","4922_1","4922_2"],
    "4924":["4924-3","4924-4"],
    "4926":["4926-1","4926-2"],
    "4945":["4945-1","4945-2","4945-3"],
    "4950":["4950-1"],
    "5004":["5004-1","5004-2"],
    "5034":["5034-0","5034_1","5034_2"],
    "5035":["5035-1"],
    "5088":["5088-1"],
    "5094":["5094-1","5094-2"],
    "5334":["5334-1","5334-2","5334-3"],
    "5495":["5495-10"],
    "5511":["5511-13"],
    "5600":["5600-1"],
    "5638":["5638-1"],
    "5723":["5723-0","5723-1","5723-2"],
    "5785":["5785-0","5785-6","5785-7","5785-15","5785-16"],
    "5786":["5786-1"],
    "5789":["5789-0","5789-1","5789-2","5789-3","5789-4","5789-5"],
    "5805":["5805-0","5805-14"],
    "5840":["5840-0","5840-1","5840-2","5840-3","5840-4","5840-18","5840-19"],
    "5841":["5841-0","5841-8","5841-9","5841-10","5841-11","5841-12","5841-17","5841-20","5841-21"],
    "5842":["5842-0","5842-13"],
    "5844":["5844-0","5844-1"],
    "5892":["5892-0","5892-1","5892-2","5892-3","5892-4","5892-5","5892-6"],
    "5918":["5918-0","5918-1","5918-2","5918-3"],
    "5955":["5955-6","5955-7"],
    "5956":["5956-1","5956-2"],
    "5963":["5963-1","5963-2","5963-3","5963-4"],
    "5976":["5976-1","5976-2"],
    "6006":["6006-0","6006-5"],
    "6052":["6052-1","6052-2"],
    "6066":["6066-1", "6066-2", "6066-3", "6066-4"],
    "6074":["6074-18","6074-19"],
    "6084":["6084-11","6084-12"],
    "6088":["6088-10"],
    "6099":["6099-9"],
    "6109":["6109-1","6109-2"],
    "6125":["6125-1","6125-2","6125-3"],
    "6126":["6126-1"],
    "6134":["6134-0","6134-1","6134-2","6134-3"],
    "6137":["6137-9"],
    "6141":["6141-1","6141-2"],
    "6142":["6142-3","6142-4"],
    "6170":["6170-0","6170-3"],
    "6176":["6176-0","6176-9"],
    "6182":["6182-1","6182-2","6182-3"],
    "6201":["6201-17"],
    "6208":["6208-1","6208-2"],
    "6213":["6213-13"],
    "6214":["6214-0","6214-1","6214-2"],
    "6297":["6297-1","6297-2"],
    "6298":["6298-1"],
    "6311":["6311-13"],
    "6376":["6376-5"],
    "6389":["6389-8"],
    "6453":["6453-0","6453-9"],
    "6454":["6454-0","6454-12"],
    "6457":["6457-0","6457-8"],
    "6466":["6466-14"],
    "6507":["6507-0","6507-1","6507-2"],
    "6510":["6510-17"],
    "6511":["6511-20"],
    "6512":["6512-15"],
    "6513":["6513-16"],
    "6514":["6514-21","6514-22"],
    "6553":["6553-3","6553-4"],
    "6565":["6565-0","6565-1"],
    "6589":["6589-1"],
    "6592":["6592-2"],
    "6609":["6609-1","6609-2","6609-3"],
    "6611":["6611-1","6611-2"],
    "6613":["6613-0","6613-1","6613-2","6613-3","6613-4","6613-5","6613-6","6613-7"],
    "6619":["6619-20","6619-21"],
    "6622":["6622-1","6622-2","6622-3","6622-4","6622-5","6622-6","6622-7","6622-8"],
    "6662":["6662-0","6662-13","6662-14"],
    "6677":["6677-0","6677-1"],
    "6681":["6681-1"],
    "6716":["6716-1"],
    "6719":["6719-0","6719-15","6719-22"],
    "6720":["6720-0","6720-1","6720-2","6720-3","6720-4","6720-6","6720-7","6720-8","6720-9"],
    "6721":["6721-0","6721-16","6721-17","6721-18","6721-19","6721-20","6721-21"],
    "6731":["6731-1"],
    "6733":["6733-0","6733-1"],
    "6738":["6738-0","6738-1","6738-2","6738-3","6738-4","6738-5","6738-6","6738-7","6738-8","6738-9","6738-10","6738-11","6738-12","6738-13","6738-14"],
    "6745":["6745-7","6745-8"],
    "6755":["6755-0","6755-10","6755-11","6755-12"],
    "6757":["6757-0","6757-22"],
    "6779":["6779-6"],
    "6780":["6780-22"],
    "6848":["6848-1","6848-2","6848-3","6848-4"],
    "6849":["6849-1","6849-2","6849-3","6849-4"],
    "6852":["6852-1"],
    "6861":["6861-7","6861-8"],
    "6864":["6864-1","6864-2","6864-3","6864-4"],
    "6868":["6868-6"],
    "6874":["6874-1"],
    "6875":["6875-1","6875-2","6875-3","6875-4"],
    "6885":["6885-20","6885-21"],
    "6912":["6912-1"],
    "6932":["6932-1","6932-2","6932-3"],
    "6939":["6939-1","6939-2","6939-3","6939-4"],
    "6951":["6951-1"],
    "6967":["6967-1","6967-2","6967-3","6967-4","6967-5"],
    "6976":["6976-15"],
    "6979":["6979-14"],
    "6984":["6984-1","6984-2","6984-3","6984-4"],
    "6988":["6988-1","6988-2"],
    "6996":["6996-0","6996-1","6996-2","6996-3","6996-4","6996-5"],
    "7004":["7004-0","7004-26","7004-27","7004-28"],
    "7005":["7005-9"],
    "7011":["7011-9"],
    "7025":["7025-0","7025-1"],
    "7042":["7042-1"],
    "7078":["7078-0","7078-23","7078-24","7078-25"],
    "7089":["7089-13"],
    "7094":["7094-11"],
    "7109":["7109-0","7109-1"],
    "7124":["7124-10"],
    "7150":["7150-12"],
    "7160":["7160-18","7160-19"],
    "7172":["7172-12"],
    "7185":["7185-16","7185-17"],
    "7203":["7203-12"],
    "7204":["7204-12"],
    "7209":["7209-1","7209-2","7209-3","7209-4"],
    "7267":["7267-11"],
    "7307":["7307-1","7307-2","7307-3"],
    "7324":["7324-0","7324-23"],
    "7325":["7325-0","7325-24"],
    "7326":["7326-0","7326-25"],
    "7327":["7327-0","7327-26"],
    "7328":["7328-0","7328-27"],
    "7329":["7329-0","7329-28"],
    "7460":["7460-22"],
    "7502":["7502-0","7502-4","7502-10","7502-11","7502-12"],
    "7545":["7545-0","7545-1","7545-2","7545-3","7545-4","7545-5","7545-6","7545-7","7545-8","7545-9"],
    "7548":["7548-29"],
    "7622":["7622-30"],
    "7672":["7672-0","7672-1","7672-2"],
    "7679":["7679-1","7679-2"],
    "7695":["7695-1","7695-2","7695-3","7695-4"],
    "7777":["7777-1"],
    "7787":["7787-1","7787-2","7787-3"],
    "7805":["7805-1","7805-2","7805-3","7805-4","7805-5","7805-6"],
    "7812":["7812-0","7812-1","7812-2"],
    "7813":["7813-1"],
    "7814":["7814-1","7814-2","7814-3"],
    "7834":["7834-1"],
    "7855":["7855-1"],
    "7879":["7879-1","7879-2"],
    "7955":["7955-1"],
    "7956":["7956-1"],
    "7960":["7960-1"],
    "7969":["7969-1","7969-2","7969-3","7969-4"],
    "7978":["7978-1"],
    "7996":["7996-1"],
    "8022":["8022-0","8022-1","8022-2"],
    "8025":["8025-1","8025-2","8025-3","8025-4","8025-5","8025-6","8025-7","8025-8","8025-9"],
    "8026":["8026-1","8026-2","8026-3","8026-4","8026-5","8026-6","8026-7","8026-8","8026-9","8026-10","8026-11","8026-12","8026-13"],
    "8079":["8079-0","8079-1","8079-2"],
    "8093":["8093-1"],
    "8094":["8094-1"],
    "8106":["8106-1","8106-2"],
    "8142":["8142-1","8142-2"],
    "8161":["8161-1","8161-2","8161-3"],
    "8239":["8239-1"],
    "8252":["8252-0","8252-1","8252-2","8252-3","8252-4"],
    "8262":["8262-1","8262-2"],
    "8285":["8285-1","8285-2"],
    "8309":["8309-0","8309-1"],
    "8423":["8423-1"],
    "8440":["8440-0","8440-1","8440-2"],
    "8443":["8443-1","8443-2","8443-3","8443-4","8443-5","8443-6","8443-7","8443-8","8443-9","8443-10","8443-11","8443-12","8443-13","8443-14"],
    "8518":["8518-1"],
    "8524":["8524-1","8524-2","8524-3","8524-4","8524-5","8524-6","8524-7","8524-8"],
    "8527":["8527-1","8527-2","8527-3","8527-4","8527-5"],
    "8528":["8528-1"],
    "8531":["8531-0","8531-1","8531-2"],
    "8546":["8546-1"],
    "8549":["8549-1"],
    "8556":["8556-1"],
    "8570":["8570-1"],
    "8574":["8574-0","8574-1","8574-2"],
    "8594":["8594-1"],
    "8596":["8596-1","8596-2"],
    "8625":["8625-1"],
    "8630":["8630-1","8630-2"],
    "8646":["8646-1","8646-2"],
    "8647":["8647-1","8647-2","8647-3"],
    "8657":["8657-1"],
    "8701":["8701-0","8701-1","8701-2"],
    "8840":["8840-0","8840-1"],
    "8899":["8899-0","8899-1","8899-2"],
    "8911":["8911-1","8911-2"],
    "9051":["9051-0","9051-1","9051-2","9051-3","9051-4","9051-5"]
};

Mapper.zoneLevelOffset = {

};

Mapper.zonePhased = {
    0: true,
    616: true,
    4720: true,
    4922: true,
    5034: true
};

//var g_zone_areas = [];
var g_mapdifficulties = {
    1: {0:0,},
    3: {0:0,},
    4: {0:0,},
    5: {0:0,},
    8: {0:0,},
    10: {0:0,},
    11: {0:0,},
    12: {0:0,},
    14: {0:0,},
    15: {0:0,},
    16: {0:0,},
    17: {0:0,},
    25: {0:0,},
    28: {0:0,},
    33: {0:0,},
    34: {0:0,},
    36: {0:0,},
    38: {0:0,},
    40: {0:0,},
    41: {0:0,},
    44: {0:0,},
    45: {0:0,},
    46: {0:0,},
    47: {0:0,},
    51: {0:0,},
    54: {0:0,},
    57: {0:0,},
    65: {0:0,},
    66: {0:0,},
    67: {0:0,},
    85: {0:0,},
    111: {0:0,},
    113: {0:0,},
    130: {0:0,},
    134: {0:0,},
    135: {0:0,},
    136: {0:0,},
    139: {0:0,},
    141: {0:0,},
    148: {0:0,},
    155: {0:0,},
    206: {1:0,2:0,},
    209: {1:0,2:0,},
    210: {0:0,},
    215: {0:0,},
    257: {0:0,},
    258: {0:0,},
    262: {0:0,},
    267: {0:0,},
    331: {0:0,},
    357: {0:0,},
    360: {0:0,},
    361: {0:0,},
    365: {0:0,},
    371: {0:0,},
    394: {0:0,},
    400: {0:0,},
    405: {0:0,},
    406: {0:0,},
    440: {0:0,},
    457: {0:0,},
    490: {0:0,},
    491: {1:0,},
    493: {0:0,},
    495: {0:0,},
    540: {0:0,},
    616: {0:0,},
    618: {0:0,},
    717: {1:0,},
    718: {1:0,},
    719: {1:0,},
    721: {1:0,},
    722: {1:0,},
    800: {0:0,},
    817: {0:0,},
    818: {0:0,},
    876: {0:0,},
    981: {0:0,},
    982: {0:0,},
    1176: {1:0,},
    1196: {1:0,2:0,},
    1337: {1:0,},
    1377: {0:0,},
    1477: {1:0,},
    1497: {0:0,},
    1517: {0:0,},
    1519: {0:0,},
    1537: {0:0,},
    1581: {1:0,2:0,},
    1583: {1:0,},
    1584: {1:0,},
    1637: {0:0,},
    1638: {0:0,},
    1657: {0:0,},
    1977: {1:0,2:0,},
    2017: {1:0,},
    2100: {1:0,},
    2159: {3:0,4:0,},
    2257: {0:0,},
    2300: {0:0,},
    2366: {1:0,2:0,},
    2367: {1:0,2:0,},
    2437: {1:0,},
    2557: {1:0,},
    2597: {0:0,},
    2677: {9:0,18:0,},
    2717: {9:0,18:0,},
    2817: {0:0,},
    3277: {0:0,},
    3358: {0:0,},
    3428: {9:0,18:0,},
    3429: {3:0,},
    3430: {0:0,},
    3433: {0:0,},
    3446: {0:0,},
    3456: {3:0,4:0,},
    3457: {3:0,},
    3483: {0:0,},
    3487: {0:0,},
    3510: {0:0,},
    3518: {0:0,},
    3519: {0:0,},
    3520: {0:0,},
    3521: {0:0,},
    3522: {0:0,},
    3523: {0:0,},
    3524: {0:0,},
    3525: {0:0,},
    3537: {0:0,},
    3557: {0:0,},
    3562: {1:0,2:0,},
    3569: {0:0,},
    3572: {0:0,},
    3606: {4:0,},
    3607: {4:0,},
    3698: {0:0,},
    3702: {0:0,},
    3703: {0:0,},
    3711: {0:0,},
    3713: {1:0,2:0,},
    3714: {1:0,2:0,},
    3715: {1:0,2:0,},
    3716: {1:0,2:0,},
    3717: {1:0,2:0,},
    3789: {1:0,2:0,},
    3790: {1:0,2:0,},
    3791: {1:0,2:0,},
    3792: {1:0,2:0,},
    3805: {1:0,2:0,},
    3820: {0:0,},
    3836: {4:0,},
    3845: {4:0,},
    3847: {1:0,2:0,},
    3848: {1:0,2:0,},
    3849: {1:0,2:0,},
    3923: {4:0,},
    3959: {14:2,33:18,},
    3968: {0:0,},
    4075: {4:0,},
    4080: {0:0,},
    4100: {1:0,2:0,},
    4131: {1:0,2:0,},
    4196: {1:0,2:0,},
    4197: {0:0,},
    4228: {1:0,2:0,},
    4264: {1:0,2:0,},
    4265: {1:0,2:0,},
    4272: {1:0,2:0,},
    4273: {3:0,4:0,},
    4277: {1:0,2:0,},
    4298: {0:0,},
    4378: {0:0,},
    4384: {0:0,},
    4395: {0:0,},
    4406: {0:0,},
    4415: {1:0,2:0,},
    4416: {1:0,2:0,},
    4493: {3:0,4:0,},
    4494: {1:0,2:0,},
    4500: {3:0,4:0,},
    4603: {3:0,4:0,},
    4706: {0:0,},
    4709: {0:0,},
    4710: {0:0,},
    4714: {0:0,},
    4720: {0:0,},
    4722: {3:0,4:0,5:0,6:0,},
    4723: {1:0,2:0,},
    4732: {0:0,},
    4737: {0:0,},
    4742: {0:0,},
    4755: {0:0,},
    4766: {0:0,},
    4778: {0:0,},
    4809: {1:0,2:0,},
    4812: {3:0,4:0,5:0,6:0,},
    4813: {1:0,2:0,},
    4815: {0:0,},
    4817: {0:0,},
    4820: {1:0,2:0,},
    4821: {0:0,},
    4911: {0:0,},
    4913: {0:0,},
    4922: {0:0,},
    4924: {0:0,},
    4926: {1:0,2:0,},
    4945: {1:0,2:0,},
    4950: {1:0,2:0,},
    4987: {3:0,4:0,5:0,6:0,},
    5004: {1:0,2:0,},
    5031: {0:0,},
    5034: {0:0,},
    5035: {1:0,2:0,},
    5042: {0:0,},
    5088: {1:0,2:0,},
    5094: {3:0,4:0,5:0,6:0,},
    5095: {0:0,},
    5144: {0:0,},
    5145: {0:0,},
    5146: {0:0,},
    5287: {0:0,},
    5334: {3:0,4:0,5:0,6:0,},
    5339: {0:0,},
    5389: {0:0,},
    5396: {1:0,2:0,},
    5416: {0:0,},
    5449: {0:0,},
    5495: {0:0,},
    5511: {0:0,},
    5600: {3:0,4:0,5:0,6:0,},
    5638: {3:0,4:0,5:0,6:0,},
    5695: {0:0,},
    5723: {3:0,4:0,5:0,6:0,},
    5733: {0:0,},
    5736: {0:0,},
    5785: {0:0,},
    5788: {2:0,},
    5789: {2:0,},
    5805: {0:0,},
    5840: {0:0,},
    5841: {0:0,},
    5842: {0:0,},
    5844: {2:0,},
    5861: {0:0,},
    5892: {3:0,4:0,5:0,6:0,7:0,},
    5918: {1:0,2:0,8:0,},
    5955: {0:0,},
    5956: {1:0,2:0,8:0,},
    5963: {1:0,2:0,8:0,},
    5976: {1:0,2:0,8:0,},
    6006: {0:0,},
    6051: {0:0,},
    6052: {1:0,2:0,8:0,},
    6066: {1:0,2:0,8:0,},
    6067: {5:0,6:0,3:0,4:0,7:0,},
    6074: {0:0,},
    6084: {0:0,},
    6088: {0:0,},
    6099: {0:0,},
    6109: {1:0,2:0,8:0,},
    6125: {3:0,4:0,5:0,6:0,7:0,},
    6126: {0:0,},
    6134: {0:0,},
    6137: {0:0,},
    6138: {0:0,},
    6141: {0:0,},
    6142: {0:0,},
    6170: {0:0,},
    6176: {0:0,},
    6182: {1:0,2:0,8:0,},
    6201: {0:0,},
    6209: {11:0,12:0,},
    6214: {1:0,2:0,8:0,},
    6296: {0:0,},
    6297: {3:0,4:0,5:0,6:0,7:0,},
    6298: {0:0,},
    6311: {0:0,},
    6376: {0:0,},
    6389: {0:0,},
    6419: {0:0,},
    6450: {0:0,},
    6451: {0:0,},
    6452: {0:0,},
    6453: {0:0,},
    6454: {0:0,},
    6455: {0:0,},
    6456: {0:0,},
    6457: {0:0,},
    6466: {0:0,},
    6507: {0:0,},
    6510: {0:0,},
    6511: {0:0,},
    6512: {0:0,},
    6513: {0:0,},
    6514: {0:0,},
    6553: {0:0,},
    6589: {0:0,},
    6592: {0:0,},
    6609: {0:0,},
    6611: {0:0,},
    6619: {0:0,},
    6622: {3:0,4:0,5:0,6:0,7:0,},
    6661: {0:0,},
    6662: {0:0,},
    6665: {0:0,},
    6719: {0:0,},
    6720: {0:0,},
    6721: {0:0,},
    6722: {0:0,},
    6723: {0:0,},
    6732: {0:0,},
    6738: {14:2,15:2,16:0,17:0,},
    6745: {0:0,},
    6755: {0:0,},
    6756: {0:0,},
    6757: {0:0,},
    6771: {12:0,},
    6780: {0:0,},
    6848: {0:0,},
    6849: {0:0,},
    6851: {12:0,},
    6861: {0:0,},
    6863: {12:0,11:0,},
    6864: {0:0,},
    6868: {0:0,},
    6874: {1:0,2:0,8:0,23:2,},
    6875: {0:0,},
    6885: {0:0,},
    6912: {1:0,2:0,8:0,23:2,},
    6932: {1:0,2:0,8:0,23:2,},
    6939: {0:0,},
    6941: {0:0,},
    6951: {1:0,2:0,8:0,23:2,},
    6960: {12:0,},
    6967: {14:2,15:2,16:0,17:0,},
    6976: {0:0,},
    6979: {0:0,},
    6980: {0:0,},
    6984: {1:0,2:0,8:0,23:2,},
    6988: {1:0,2:0,8:0,23:2,},
    6996: {14:2,15:2,16:0,17:0,},
    7004: {0:0,},
    7005: {0:0,},
    7025: {0:0,},
    7042: {0:0,},
    7078: {0:0,},
    7083: {0:0,},
    7089: {0:0,},
    7107: {0:0,},
    7109: {1:0,2:0,8:0,23:2,},
    7124: {0:0,},
    7160: {0:0,},
    7185: {0:0,},
    7203: {0:0,},
    7204: {0:0,},
    7209: {0:0,},
    7267: {0:0,},
    7307: {1:0,2:0,19:0,8:0,23:2,},
    7324: {0:0,},
    7325: {0:0,},
    7326: {0:0,},
    7327: {0:0,},
    7328: {0:0,},
    7329: {0:0,},
    7332: {0:0,},
    7333: {0:0,},
    7334: {0:0,},
    7343: {0:0,},
    7381: {12:0,},
    7460: {0:0,},
    7462: {20:0,},
    7502: {0:0,},
    7503: {0:0,},
    7519: {12:0,},
    7534: {12:0,},
    7541: {0:0,},
    7543: {0:0,},
    7545: {14:2,15:2,16:0,17:0,},
    7546: {1:0,2:0,8:0,23:2,},
    7548: {25:0,},
    7558: {0:0,},
    7576: {0:0,},
    7578: {0:0,},
    7588: {0:0,},
    7622: {0:0,},
    7634: {0:0,},
    7637: {0:0,},
    7638: {0:0,},
    7656: {0:0,},
    7658: {12:0,},
    7672: {1:0,2:0,8:0,23:2,},
    7673: {1:0,2:0,8:0,23:2,},
    7674: {1:0,},
    7679: {0:0,},
    7690: {0:0,},
    7691: {0:0,},
    7695: {12:0,},
    7705: {0:0,},
    7731: {0:0,},
    7737: {12:0,},
    7744: {0:0,},
    7745: {0:0,},
    7767: {0:0,},
    7771: {0:0,},
    7777: {12:0,},
    7787: {1:0,2:0,8:0,23:2,},
    7796: {12:0,},
    7805: {1:0,2:0,8:0,23:2,},
    7811: {1:0,2:0,8:0,23:2,},
    7812: {1:0,2:0,8:0,23:2,},
    7813: {0:0,},
    7814: {0:0,},
    7816: {0:0,},
    7822: {0:0,},
    7827: {0:0,},
    7830: {0:0,},
    7834: {0:0,},
    7838: {0:0,},
    7846: {0:0,},
    7855: {8:0,23:2,2:0,},
    7856: {0:0,},
    7875: {0:0,},
    7877: {0:0,},
    7879: {0:0,},
    7884: {0:0,},
    7885: {0:0,},
    7886: {0:0,},
    7887: {0:0,},
    7888: {0:0,},
    7889: {0:0,},
    7890: {0:0,},
    7891: {0:0,},
    7892: {0:0,},
    7893: {0:0,},
    7894: {0:0,},
    7895: {0:0,},
    7896: {0:0,},
    7897: {0:0,},
    7898: {0:0,},
    7899: {0:0,},
    7900: {0:0,},
    7901: {0:0,},
    7902: {0:0,},
    7903: {0:0,},
    7918: {12:0,},
    7921: {0:0,},
    7945: {12:0,},
    7952: {0:0,},
    7955: {12:0,},
    7960: {12:0,},
    7969: {12:0,},
    7974: {12:0,},
    7976: {0:0,},
    7979: {0:0,},
    7996: {1:0,2:0,23:2,},
    8000: {0:0,},
    8005: {5:0,6:0,3:0,4:0,7:0,},
    8006: {0:0,},
    8007: {0:0,},
    8008: {0:0,},
    8012: {0:0,},
    8013: {12:0,},
    8017: {12:0,},
    8022: {0:0,},
    8023: {0:0,},
    8025: {14:2,15:2,16:0,17:0,},
    8026: {14:2,15:2,16:0,17:0,},
    8040: {1:0,2:0,8:0,23:2,},
    8044: {12:0,},
    8046: {12:0,},
    8053: {0:0,},
    8054: {0:0,},
    8057: {0:0,},
    8058: {0:0,},
    8059: {0:0,},
    8060: {0:0,},
    8061: {0:0,},
    8062: {0:0,},
    8063: {0:0,},
    8064: {0:0,},
    8079: {8:0,23:2,2:0,},
    8091: {0:0,},
    8093: {0:0,},
    8094: {12:0,},
    8098: {0:0,},
    8105: {0:0,},
    8106: {12:0,},
    8124: {1:4,},
    8125: {0:0,},
    8142: {12:0,},
    8161: {12:0,},
    8180: {0:0,},
    8205: {12:0,},
    8239: {12:0,},
    8250: {12:0,},
    8252: {12:0,},
    8262: {12:0,},
    8265: {12:0,},
    8275: {12:0,},
    8276: {12:0,},
    8277: {12:0,},
    8285: {0:0,},
    8309: {12:0,},
    8330: {0:0,},
    8344: {12:0,},
    8347: {12:0,},
    8392: {0:0,},
    8406: {12:0,},
    8422: {1:4,},
    8423: {12:0,},
    8439: {12:0,},
    8440: {14:2,15:2,16:0,17:0,},
    8443: {23:10,2:0,8:0,},
    8445: {0:0,},
    8451: {12:0,},
    8457: {0:0,},
    8460: {12:0,},
    8469: {12:0,},
    8473: {1:0,},
    8474: {0:0,},
    8479: {12:0,},
    8482: {0:0,},
    8483: {12:0,},
    8485: {25:0,},
    8508: {0:0,},
    8514: {12:0,},
    8518: {12:0,},
    8520: {0:0,},
    8524: {14:2,15:2,16:1,17:0,},
    8527: {2:0,8:0,23:2,},
    8528: {12:0,},
    8529: {0:0,},
    8531: {12:0,},
    8535: {0:0,},
    8538: {12:0,},
    8546: {12:0,},
    8549: {12:0,},
    8556: {12:0,},
    8561: {12:0,},
    8570: {12:0,},
    8579: {0:0,},
    8581: {12:0,},
    8583: {1:0,2:0,8:0,23:2,},
    8591: {0:0,},
    8594: {12:0,},
    8596: {12:0,},
    8597: {0:0,},
    8598: {0:0,},
    8600: {0:0,},
    8624: {0:0,},
    8625: {12:0,},
    8630: {12:0,},
    8639: {14:0,},
    8640: {12:0,},
    8641: {12:0,},
    8645: {12:0,},
    8646: {12:0,},
    8647: {12:0,},
    8651: {12:0,},
    8656: {0:0,},
    8657: {12:0,},
    8660: {12:0,},
    8672: {12:0,},
    8676: {12:0,},
    8709: {0:0,},
    8712: {1:0,2:0,},
    9051: {12:0,},
};

Mapper.garrisonLevelsToMapTiers = {"7004":{"26":1,"27":2,"28":3},"7078":{"23":1,"24":2,"25":3}};
Mapper.zoneDefaultLevel = {"3456":5,"3457":2,"4812":5,"6298":1,"6142":3,"6611":1};
Mapper.remappedLevels = {"2257":[1],"7637":{"1":0}};