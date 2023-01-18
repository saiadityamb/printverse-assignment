data = {
    'IND':{
        "M":5,
        "W":4,
        "L":1,
        "NRR":1.319,
        "Pts":8
    },
    'PAK':{
        "M":5,
        "W":3,
        "L":2,
        "NRR":1.028,
        "Pts":6
    },
    'SA':{
        "M":5,
        "W":2,
        "L":2,
        "NRR":0.874,
        "Pts":5
    },
    'BAN':{
        "M":5,
        "W":2,
        "L":3,
        "NRR":-1.176,
        "Pts":4
    },
    'NED':{
        "M":5,
        "W":2,
        "L":3,
        "NRR":-0.849,
        "Pts":4
    },

    'ZIM':{
        "M":5,
        "W":1,
        "L":1,
        "NRR":1.138,
        "Pts":3
    },

}

ls1 = [key for key in data.keys()]
ls2 = [data[key]['Pts'] for key in data.keys()]
ls3 = [data[key]['NRR'] for key in data.keys()]
zipped = zip(ls1, ls2,ls3)
zipped = list(zipped)
res = sorted(zipped, key = lambda x: (x[1],-x[2]))
print(res)