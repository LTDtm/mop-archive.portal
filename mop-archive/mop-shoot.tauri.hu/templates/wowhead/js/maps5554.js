var myMapper;
var ma_subZones = {
    "5339": ["33", "5287"],
    "6170": ["34"],
    "267": ["36"],
    "12": ["54", "57", "6170"],
    "40": ["111", "113", "6510"],
    "1": ["134", "136", "800", "5495", "6176", "6457"],
    "6457": ["135"],
    "6454": ["155"],
    "141": ["257", "258", "262", "6450"],
    "215": ["360", "818", "6452"],
    "14": ["365", "371", "817", "6451", "6453"],
    "490": ["540"],
    "440": ["981", "982", "2300"],
    "3": ["1517"],
    "1377": ["3446"],
    "3433": ["3510"],
    "3524": ["3569", "3572", "6456"],
    "4714": ["4732", "4817"],
    "4737": ["4766"],
    "4720": ["4778", "4911", "4924"],
    "5146": ["4815", "5144", "5145"],
    "6453": ["4913"],
    "85": ["5511", "6454", "7976"],
    "5785": ["5955", "6512", "6513"],
    "5840": ["6074"],
    "5841": ["6084", "6088", "6099", "6201", "6389", "6419", "6619", "7952"],
    "6176": ["6137"],
    "5842": ["6311"],
    "6006": ["6376"],
    "3430": ["6455"],
    "5805": ["6466"],
    "17": ["6511"],
    "405": ["6514"],
    "6507": ["6589", "6592"],
    "6134": ["6609"],
    "6677": ["6681"],
    "6720": ["6745", "6848", "6849", "6861", "6864", "6868", "6875", "6939", "7004", "7005", "7209"],
    "6757": ["6780"],
    "6721": ["6885", "7160", "7185"],
    "6719": ["6976", "7078", "7083", "7460"],
    "6662": ["6979", "6980", "7089", "7622"],
    "7025": ["7042"],
    "6755": ["7124", "7203", "7204", "7267"],
    "7078": ["7324", "7325", "7326"],
    "7004": ["7327", "7328", "7329"],
    "6941": ["7332", "7333"],
    "8485": ["7548"],
    "7503": ["7731", "7877"],
    "7541": ["7744", "7830", "7921"],
    "7637": ["7767"],
    "7812": ["7811"],
    "7558": ["7846"],
    "7902": ["7903"],
    "7334": ["8000"],
    "7502": ["8012"],
    "8022": ["8023"]
};

function ma_Init() {
    var h = [
        [0, LANG.maps_zones, null, [
            [0, LANG.maps_cosmicmap, ma_ChooseZone.bind(null, -4, false)],
            [1, LANG.maps_azeroth, ma_ChooseZone.bind(null, -1, false)],
            [2, LANG.maps_ek, ma_ChooseZone.bind(null, -3, false), ma_AddOptions([1, 3, 4, 8, 10, 11, 12, 28, 38, 40, 41, 44, 45, 46, 47, 51, 85, 130, 139, 267, 1497, 1519, 1537, 3430, 3433, 3487, 4080, 4298, 4714, 4755, 4922, 5095, 5146, 5339, 5389])],
            [3, LANG.maps_kalimdor, ma_ChooseZone.bind(null, -6, false), ma_AddOptions([14, 15, 16, 17, 141, 148, 215, 331, 357, 361, 400, 405, 406, 440, 457, 490, 493, 616, 618, 1377, 1637, 1638, 1657, 3524, 3525, 3557, 4709, 5034, 5695, 5733])],
            [4, LANG.maps_maelstrom, ma_ChooseZone.bind(null, 5630, false), ma_AddOptions([4720, 4737, 5042, 5416, 5630])],
            [5, LANG.maps_outland, ma_ChooseZone.bind(null, -2, false), ma_AddOptions([3483, 3518, 3519, 3520, 3521, 3522, 3523, 3703])],
            [6, LANG.maps_northrend, ma_ChooseZone.bind(null, -5, false), ma_AddOptions([65, 66, 67, 210, 394, 495, 2817, 3537, 3711, 4197, 4395, 4742])],
            [7, LANG.maps_pandaria, ma_ChooseZone.bind(null, -7, false), ma_AddOptions([5785, 5805, 5840, 5841, 5842, 6006, 6134, 6138, 6141, 6142, 6507, 6661, 6757])],
            /*[8, LANG.maps_warlords, ma_ChooseZone.bind(null, -8, false), ma_AddOptions([6941, 6755, 6662, 6721, 6722, 6720, 6719, 7083, 6980, 6723])],
             [9, LANG.maps_legion, ma_ChooseZone.bind(null, -9, false), ma_AddOptions([7334, 7503, 7541, 7543, 7558, 7637])]*/
        ]],
        [, LANG.maps_other],
        [1, LANG.maps_instances, null, [
            [0, LANG.maps_raids, null, ma_AddOptions(ma_GetInstancesFromMenu(-2))],
            [1, LANG.maps_dungeons, null, ma_AddOptions(ma_GetInstancesFromMenu(-1), true)],
            [2, LANG.maps_scenarios, null, ma_AddOptions([6040, 6101, 6208, 6209, 6219, 6309, 6328, 6426, 6500, 6565, 6567, 6575, 6613, 6615, 6616, 6677, 6678, 6716, 6731, 6733, 6771, 6852])],
            [3, LANG.maps_battlegrounds, null, ma_AddOptions([2597, 3277, 3358, 3820, 4384, 4710, 5031, 5449, 6051, 6126])]
        ]]
    ];
    for (var f = 0, b; b = h[f]; f++) {
        if (b[MENU_IDX_SUB]) {
            Menu.addButtons_maps(ge("maps-menus-expanded"), b[MENU_IDX_SUB])
        }
    }
    myMapper = new Mapper({
        parent: "dbs3b53",
        editable: true,
        zoom: 1,
        onPinUpdate: ma_UpdateLink,
        onMapUpdate: ma_UpdateLink
    });
    var d = location.href.indexOf("data=");
    if (d != -1) {
        d = location.href.substr(d + 5);
        var e = d.split(":");
        var a = parseInt(e[0]);
        var c = ma_GetDefaultLevel(a);
        if (myMapper.setLink(d, false, c)) {
            ge("mapper").style.display = "";
            ge("maps-tip").style.display = "none"
        }
    }
}

function ma_GetInstancesFromMenu(f) {
    var b = {};
    var e = [];
    for (var j, d = 0; j = mn_zones[d]; d++) {
        if (j[3] && j[3].length && j[0] && j[0] >= 100 && j[0] <= 110) {
            for (var i, c = 0; i = j[3][c]; c++) {
                if (i[3] && i[3].length && i[0] == f) {
                    for (var h, a = 0; h = i[3][a]; a++) {
                        if (h[0]) {
                            b[h[0]] = true
                        }
                    }
                }
            }
        }
    }
    for (var g in b) {
        if (b.hasOwnProperty(g)) {
            e.push(g)
        }
    }
    return e
}

function ma_GetDefaultLevel(a, c) {
    if (isNaN(a)) {
        return -1
    }
    var b = false;
    if (c) {
        b = typeof Mapper.zoneLevelOffset[a] == "undefined"
    }
    return Mapper.prototype.fixLevel(b ? 1 : 0, a)
}

function ma_AddOptions(f, e) {
    if (!e) {
        e = false
    }
    f.sort(ma_Sort);
    var g = [];
    for (var b = 0, d; d = f[b]; b++) {
        if (g_zones[d] == null) {
            continue
        }
        var a = [d, g_zones[d], ma_ChooseZone.bind(null, d, e)];
        if (ma_subZones[d]) {
            var c = ma_AddOptions(ma_subZones[d]);
            if (c instanceof Array) {
                a[MENU_IDX_SUB] = c
            }
        }
        g.push(a)
    }
    return g
}

function ma_Sort(d, c) {
    if (typeof d == "string") {
        d = parseInt(d)
    }
    if (typeof c == "string") {
        c = parseInt(c)
    }
    return stringCompare(g_zones[d], g_zones[c])
}

function ma_ChooseZone(c, b) {
    if (c && c != "0") {
        if (myMapper.getZone() == 0) {
            ge("mapper").style.display = "";
            ge("maps-tip").style.display = "none"
        }
        var a = ma_GetDefaultLevel(c, b);
        myMapper.setZone(c, a);
    }
}

function ma_UpdateLink(d) {
    var a = "", c = d.getLink();
    if (c) {
        a += "#data=" + c
    }
    ge("link-to-this-map").href = a
};