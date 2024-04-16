Search.setIndex({"docnames": ["exercises", "index", "io-best-practices", "memory", "num-cores", "scheduling", "testing"], "filenames": ["exercises.md", "index.md", "io-best-practices.rst", "memory.md", "num-cores.md", "scheduling.md", "testing.md"], "titles": ["Exercises", "Tuesdays tools and techniques for HPC: Real-life compute cluster workflows", "I/O Best Practices", "Measuring and choosing the right amount of memory", "How to choose the number of cores by timing a series of runs", "Job scheduling and Slurm basics", "How to test this lesson"], "terms": {"It": [0, 1, 2, 3, 4, 5], "": [0, 1, 2, 4, 5], "good": [0, 2, 3, 4], "idea": [0, 5], "run": [0, 1, 2, 5], "thi": [0, 1, 2, 3, 5], "wai": [0, 2, 3], "you": [0, 1, 2, 4, 5, 6], "avoid": [0, 2], "conflict": 0, "between": [0, 1, 2, 3, 4], "depend": [0, 1, 2, 5, 6], "differ": [0, 1, 2], "project": 0, "triton": 0, "saga": [0, 6], "fram": 0, "betzi": 0, "csc": 0, "cluster": [0, 2, 4, 6], "we": [0, 1, 2, 3, 5], "recommend": [0, 2, 3, 5], "us": [0, 1, 2, 3, 4, 6], "conda": 0, "note": [0, 2, 3, 4], "need": [0, 1, 2, 4, 5], "sourc": [0, 5], "activ": [0, 2], "modul": [0, 4, 5], "load": [0, 2, 4, 5], "miniconda": 0, "creat": [0, 2], "n": [0, 4], "env_nam": 0, "python": [0, 2, 3, 4], "pip": [0, 2], "instal": [0, 2], "r": [0, 2, 4], "requir": [0, 2, 3, 4, 6], "miniconda3": 0, "On": 0, "can": [0, 1, 2, 3, 5], "container": 0, "contain": [0, 2], "purg": [0, 4], "tykki": 0, "mkdir": 0, "myenv": 0, "new": 0, "prefix": 0, "txt": [0, 2], "export": 0, "path": [0, 2], "pwd": 0, "bin": [0, 4, 5], "try": [0, 2, 3, 5], "reproduc": [0, 5], "result": [0, 3], "from": [0, 2, 3, 4, 5], "how": [0, 1], "choos": [0, 1], "number": [0, 1, 2, 3, 5], "core": [0, 1, 3, 5, 6], "time": [0, 2, 5], "seri": [0, 1], "exampl": [0, 1, 2, 6], "appli": 0, "methodologi": 0, "find": [0, 2, 4, 5], "optim": [0, 2], "measur": [0, 1, 2, 4, 5], "right": [0, 1, 2, 5], "amount": [0, 1, 2, 5], "memori": [0, 1, 2, 4, 5, 6], "much": [0, 1, 2, 3, 4, 5], "paramet": [0, 3], "search": 0, "fast": [0, 2], "simul": [0, 2], "step": [0, 2, 4, 5], "The": [0, 1, 2, 3, 4, 5], "function": [0, 2], "gpu": [0, 2], "i": 0, "veri": [0, 2, 4], "would": [0, 2, 5], "improv": [0, 1, 2], "o": [0, 1, 3, 4, 6], "perform": [0, 2, 5], "datafil": 0, "open": [0, 2, 5], "f": [0, 3], "read": [0, 1, 2], "json": [0, 2], "write": [0, 2, 5], "dump": 0, "an": [0, 1, 2, 3, 4, 5], "machin": [0, 3], "learn": [0, 1], "train": [0, 2], "script": [0, 2, 3, 4], "http": [0, 2, 4, 5], "github": [0, 2], "com": [0, 2, 4, 5], "coderefineri": [0, 2, 4], "cifar100_exampl": 0, "small": [0, 2, 5], "enough": [0, 2, 3, 4], "most": [0, 1, 2, 5], "system": [0, 3, 5, 6], "workflow": [0, 3], "especi": 0, "problemat": 0, "perspectic": 0, "ar": [0, 1, 3, 4, 5], "prepar": 0, "significantli": 0, "larger": [0, 1, 2], "dataset": [0, 2], "what": [0, 1, 2, 3], "should": [0, 2, 4, 6], "take": [0, 2, 4, 5], "account": [0, 3, 4, 5], "count": [0, 2, 4], "file": [0, 3, 5, 6], "oper": [0, 2], "singl": [0, 2, 4], "epoch": [0, 2], "studi": [0, 4], "where": [0, 1, 2, 5], "actual": [0, 1, 2, 4, 5], "happen": [0, 2], "reduc": [0, 3, 4, 5], "disk": 0, "doe": [0, 1, 2, 3, 5], "dd": [0, 2], "gener": [0, 2, 3], "larg": [0, 4, 5], "local": 0, "hpc": [0, 2, 3], "which": [0, 1, 3, 4, 5], "faster": [0, 2, 5], "when": [0, 2, 5], "slower": [0, 2], "than": [0, 2, 3, 4, 5], "desktop": 0, "pipelin": [0, 2], "instruct": [0, 2], "readm": 0, "research": [0, 4], "commonli": 0, "type": [0, 1, 3, 4], "possibl": [0, 1, 2, 3, 5], "handl": [0, 2], "pattern": [0, 2], "spend": [0, 1], "wait": [0, 2, 3, 4, 5], "signific": 0, "portion": 0, "your": [1, 2, 3, 4, 5], "ve": 1, "had": [1, 3], "basic": 1, "work": [1, 2, 3, 6], "do": [1, 2, 3, 4, 5], "peopl": [1, 4], "show": [1, 2, 3, 4], "practic": 1, "tip": 1, "mai": [1, 3], "help": [1, 2, 3], "aren": 1, "t": [1, 2, 4, 5], "usual": [1, 2], "cover": 1, "either": [1, 2], "advanc": 1, "won": 1, "go": [1, 4, 6], "so": [1, 2, 4], "deep": [1, 2], "each": [1, 2, 4, 5], "topic": 1, "know": [1, 3, 4, 5], "everyth": [1, 2], "about": [1, 2], "see": [1, 3], "some": [1, 2, 4, 5], "follow": [1, 2, 3, 4], "up": [1, 2, 3], "format": [1, 3, 6], "design": [1, 3], "firesid": 1, "chat": 1, "expert": 1, "combin": 1, "demo": 1, "along": 1, "independ": [1, 2, 3], "exercis": [1, 4], "engag": 1, "level": 1, "interest": 1, "usag": [1, 3], "don": [1, 4, 5], "have": [1, 2, 3, 4, 5, 6], "mani": [1, 2, 4, 5], "thing": 1, "talk": 1, "make": [1, 2, 3, 5], "sens": [1, 3, 4], "might": [1, 2, 3, 4, 5, 6], "pick": 1, "someth": [1, 2, 6], "anywai": 1, "A": [1, 2, 3, 4], "bit": [1, 2, 5], "experi": [1, 2], "technic": 1, "option": [1, 5], "allow": 1, "materi": 1, "deeper": 1, "access": 1, "slurm": [1, 3], "base": 1, "dai": [1, 2, 5], "If": [1, 2, 3, 5], "all": [1, 2, 4, 5], "still": [1, 2], "15": [1, 2, 3, 4], "min": 1, "job": [1, 2, 4, 6], "schedul": [1, 3, 4], "5": [1, 2, 3], "discuss": [1, 2], "break": 1, "50": [1, 2], "best": 1, "other": [1, 2, 3, 4, 5], "resourc": [1, 2, 3, 4], "also": [1, 3, 5], "extrem": 1, "let": [1, 2], "more": [1, 2, 4, 5], "direct": 1, "later": [1, 4, 5], "learner": 1, "persona": 1, "just": [1, 2, 4, 5], "taken": [1, 2], "while": [1, 2], "mostli": [1, 2], "understand": [1, 2, 4, 5], "piec": [1, 2, 5], "left": [1, 3, 5], "wonder": 1, "fit": [1, 2, 5], "togeth": [1, 2, 5], "whole": [1, 2], "care": 1, "now": [1, 3, 4, 5], "wouldn": 1, "mind": 1, "out": [1, 2, 3, 4, 5], "scope": 1, "stuff": 1, "long": [1, 4, 5], "too": [1, 2, 3, 4, 5], "mental": 1, "effort": 1, "ll": 1, "probabl": [1, 4], "watch": 1, "rest": 1, "until": 1, "come": [1, 3], "back": [1, 2, 5], "been": 1, "fine": [1, 5], "think": [1, 2, 5], "well": [1, 3, 4], "must": 1, "trick": 1, "even": [1, 2], "better": [1, 2, 3, 5], "attend": 1, "passiv": 1, "collabor": 1, "10": [1, 2, 3, 5], "instructor": 1, "bottleneck": 2, "One": [2, 5], "hard": 2, "No": 2, "code": 2, "setup": 2, "ttt4hpc": 2, "io": 2, "wish": [2, 4], "packag": 2, "list": [2, 5], "them": [2, 4, 5], "In": [2, 3, 4, 5], "lesson": 2, "problem": [2, 3, 4, 5], "diagnos": 2, "structur": 2, "fix": 2, "allevi": 2, "restuctur": 2, "move": 2, "conveni": 2, "storag": 2, "demonstr": [2, 4], "slowest": 2, "part": 2, "tend": 2, "bad": 2, "figur": 2, "1": [2, 3, 4, 5, 6], "consist": 2, "metadata": 2, "who": [2, 5, 6], "own": [2, 4], "wa": 2, "last": 2, "modifi": 2, "big": [2, 4], "content": 2, "program": [2, 5], "check": [2, 4], "stat": 2, "call": [2, 5], "descriptor": 2, "written": [2, 4], "For": [2, 3, 4, 5], "l": 2, "cat": 2, "2": [2, 4, 5], "effect": 2, "v": [2, 6], "one": [2, 3, 4, 5], "store": 2, "commun": [2, 4], "node": [2, 3, 4, 5, 6], "But": [2, 3, 4, 5], "wors": 2, "first": [2, 4, 5], "determin": [2, 5], "includ": [2, 4], "collaps": 2, "section": [2, 3, 4], "titl": 2, "clone": 2, "repositori": 2, "git": 2, "cd": 2, "extra": [2, 3], "index": 2, "url": 2, "download": 2, "pytorch": 2, "org": 2, "whl": 2, "cpu": [2, 3, 4, 5, 6], "data_formats_1": 2, "generate_data": 2, "py": [2, 3, 6], "create_arch": 2, "folder": 2, "7300": 2, "csv": 2, "archiv": 2, "tar": 2, "same": [2, 3, 4, 5], "thei": 2, "hour": [2, 4, 5], "There": [2, 5], "20": [2, 3, 5], "year": 2, "175200": 2, "row": [2, 5], "naiv": 2, "here": [2, 4, 5], "panda": 2, "datafram": 2, "approach": [2, 3], "read_files_na": 2, "simplest": 2, "version": 2, "read_fil": 2, "onli": [2, 3, 5], "loop": 2, "give": [2, 3, 4], "fair": 2, "comparison": 2, "strace": 2, "c": [2, 4], "e": [2, 4], "trace": 2, "desc": 2, "case": [2, 3, 4, 5], "3": [2, 3, 6], "6": 2, "second": [2, 3, 5, 6], "8028": 2, "6240997314453125": 2, "mean": [2, 4], "4964045698924733": 2, "usec": 2, "error": [2, 5], "syscal": 2, "31": [2, 4], "83": 2, "0": [2, 3, 4, 5, 6], "441350": 2, "54": [2, 3], "23": [2, 6], "72": 2, "287255": 2, "18": 2, "15907": 2, "65": 2, "258579": 2, "8318": 2, "close": 2, "09": [2, 4], "250797": 2, "fstat": 2, "4": [2, 4, 5], "88": [2, 4], "067700": 2, "15806": 2, "lseek": 2, "35": 2, "032638": 2, "7903": 2, "7896": 2, "ioctl": 2, "66": 2, "022961": 2, "45": 2, "505": 2, "mmap": 2, "22": 2, "016958": 2, "312": 2, "openat": 2, "59": 2, "008121": 2, "13": 2, "624": 2, "getdent": 2, "00": [2, 3, 4, 5, 6], "000018": 2, "9": 2, "000003": 2, "fcntl": 2, "000000": 2, "epoll_create1": 2, "100": [2, 4], "386380": 2, "73317": 2, "7922": 2, "total": [2, 3, 4, 6], "sequenti": 2, "uncompress": 2, "essenti": 2, "concaten": 2, "stream": 2, "mode": 2, "order": [2, 3], "otherwis": [2, 3], "read_arch": 2, "fewer": 2, "my": [2, 3], "588": 2, "0703248977661133": 2, "27": [2, 3, 4, 6], "39": 2, "075740": 2, "128": [2, 4], "90": 2, "057777": 2, "2516": 2, "91": 2, "043988": 2, "42": 2, "1027": 2, "58": 2, "043066": 2, "67": 2, "638": 2, "8": [2, 4, 6], "023747": 2, "25": 2, "926": 2, "80": 2, "013264": 2, "511": 2, "012307": 2, "26": 2, "463": 2, "456": 2, "48": 2, "004104": 2, "57": 2, "71": 2, "002500": 2, "17": 2, "142": 2, "000007": 2, "000005": 2, "276505": 2, "6889": 2, "481": 2, "random": [2, 3, 4], "sai": [2, 4], "model": 2, "sinc": [2, 3, 5], "cannot": [2, 4], "alwai": [2, 5], "read_archive_random": 2, "sequanti": 2, "individu": 2, "took": 2, "591": 2, "1685996055603027": 2, "24": 2, "14": [2, 4], "091852": 2, "155": 2, "21": 2, "52": [2, 6], "081871": 2, "78": [2, 4], "1038": 2, "97": [2, 3], "056972": 2, "55": 2, "1031": 2, "052431": 2, "81": [2, 4], "641": 2, "64": [2, 4], "051899": 2, "30693": 2, "019895": 2, "38": 2, "89": 2, "014816": 2, "467": 2, "460": 2, "86": [2, 6], "007093": 2, "99": [2, 6], "96": 2, "003658": 2, "380513": 2, "35192": 2, "485": 2, "great": 2, "didn": 2, "chunk": 2, "shuffl": 2, "read_random_chunk": 2, "few": [2, 3, 4, 5], "112762212753296": 2, "29": 2, "36": [2, 6], "109168": 2, "185": 2, "19": [2, 4], "072187": 2, "28": 2, "2518": 2, "16": [2, 4], "062369": 2, "054685": 2, "53": 2, "7": 2, "06": [2, 6], "026230": 2, "019879": 2, "512": 2, "32": [2, 4], "012342": 2, "51": 2, "009336": 2, "131": 2, "49": 2, "005554": 2, "000011": 2, "371768": 2, "6892": 2, "output": [2, 3, 5, 6], "readabl": 2, "tool": [2, 4], "pars": [2, 3], "human": 2, "coupl": 2, "found": 2, "cniethamm": 2, "analyz": 2, "rust": 2, "wookietreib": 2, "lustr": 2, "ask": [2, 3, 4, 5], "high": [2, 5], "multipl": [2, 4, 5], "server": 2, "huge": 2, "minim": 2, "risk": 2, "loss": 2, "hardwar": 2, "failur": 2, "provid": [2, 5], "throughput": 2, "client": 2, "whether": 2, "user": [2, 3, 5, 6], "ha": [2, 3, 4, 5], "suffici": 2, "after": [2, 4], "finish": [2, 5], "contact": [2, 4], "both": 2, "question": [2, 4], "relev": [2, 3], "These": [2, 4], "connect": [2, 5], "comput": [2, 3, 4, 5], "interconnect": 2, "latenc": 2, "involv": 2, "sure": [2, 3], "normal": 2, "cycl": 2, "interfac": [2, 4], "rate": [2, 3], "approxim": 2, "bandwidth": [2, 4], "drive": 2, "gb": [2, 6], "nvme": 2, "ssd": 2, "vram": 2, "3500": 2, "hamper": 2, "interact": 2, "frustrat": 2, "becaus": [2, 3, 4], "often": [2, 3, 4, 5], "hidden": 2, "mayb": 2, "librari": [2, 4], "correctli": 2, "accumul": 2, "seem": 2, "pass": [2, 4], "through": [2, 4, 5, 6], "scale": 2, "longer": [2, 3, 4, 5], "ineffici": 2, "pretti": 2, "reserv": [2, 3], "congest": 2, "carri": [2, 3], "kept": 2, "space": 2, "wrong": 2, "chosen": 2, "inspect": [2, 4], "plot": 2, "profil": [2, 3, 4], "detect": 2, "identifi": 2, "howev": [2, 4, 5], "test": [2, 4], "isol": 2, "editor": 2, "process": 2, "binari": [2, 4], "effici": [2, 3, 6], "directli": [2, 3, 4, 5], "document": 2, "persist": 2, "copi": [2, 5], "begin": 2, "end": 2, "unzip": 2, "d": [2, 5], "tmp": 2, "zip": 2, "train_model": 2, "cp": 2, "dev": 2, "zero": [2, 3], "largefil": 2, "b": 2, "1024m": 2, "md5sum": 2, "shm": 2, "linux": 2, "limit": [2, 3, 5], "avail": [2, 5], "queue": [2, 3, 5], "lot": [2, 3, 4, 5], "easili": 2, "becom": [2, 5], "easi": [2, 4], "starv": 2, "input": [2, 3, 4, 6], "further": 2, "complic": 2, "fact": [2, 4], "To": 2, "deal": 2, "around": 2, "framework": [2, 5], "similar": [2, 4], "split": [2, 5], "shard": 2, "full": [2, 5], "gigabyt": 2, "size": [2, 3, 4, 5, 6], "dure": 2, "thread": [2, 4], "collect": [2, 5], "master": 2, "batch": 2, "loader": 2, "webdataset": 2, "posix": 2, "create_dataset": 2, "imagenet": 2, "downlaod": 2, "address": 2, "protocol": 2, "unix": 2, "pipe": 2, "wd": 2, "filenam": 2, "equival": 2, "flexibl": 2, "unfortun": 2, "though": 2, "link": 2, "complet": [3, 4, 6], "block": [3, 5], "safe": 3, "sorri": 3, "alloc": [3, 4], "lead": [3, 4], "charg": 3, "group": [3, 5, 6], "tax": 3, "payer": 3, "financ": 3, "u": 3, "less": 3, "parallel": [3, 4], "sever": 3, "excess": 3, "unus": 3, "import": [3, 4, 5], "below": [3, 4, 6], "util": [3, 6], "turn": 3, "done": [3, 4], "speedili": 3, "littl": 3, "stop": 3, "late": 3, "submit": [3, 6], "onc": 3, "add": [3, 5], "perhap": [3, 4, 5], "runtim": 3, "compar": 3, "repres": [3, 4, 5], "speak": 3, "partit": [3, 5], "spread": 3, "over": [3, 4, 5], "price": 3, "pai": 3, "queu": [3, 4, 5], "possibli": 3, "altern": 3, "demand": [3, 4], "argpars": 3, "command": [3, 4, 5, 6], "line": [3, 4, 5], "argument": [3, 4, 5], "parser": 3, "argumentpars": 3, "add_argu": 3, "sum": 3, "int": 3, "true": 3, "arg": 3, "parse_arg": 3, "bunch": 3, "random_numb": 3, "uniform": 3, "_": 3, "rang": 3, "specifi": [3, 4, 5], "sleep": 3, "print": 3, "5000": 3, "47": 3, "64438375296812": 3, "want": [3, 6], "consum": [3, 4], "50000000": 3, "instead": [3, 4], "env": [3, 4, 5], "bash": [3, 4, 5], "sbatch": [3, 4, 5], "myproject": [3, 4, 5], "name": [3, 4, 5], "mem": [3, 5], "05": [3, 5, 6], "per": [3, 4, 5, 6], "2500m": 3, "ntask": [3, 4, 5], "Then": 3, "being": [3, 6], "44": [3, 6], "percent": [3, 6], "got": [3, 6], "84": [3, 6], "elaps": [3, 6], "wall": [3, 6], "clock": [3, 6], "h": [3, 6], "mm": [3, 6], "ss": [3, 6], "m": [3, 6], "averag": [3, 6], "share": [3, 4, 5, 6], "text": [3, 6], "kbyte": [3, 6], "unshar": [3, 6], "data": [3, 4, 5, 6], "stack": [3, 6], "maximum": [3, 6], "resid": [3, 6], "set": [3, 4, 5, 6], "1993080": 3, "major": [3, 6], "page": [3, 6], "fault": [3, 6], "minor": [3, 6], "reclaim": [3, 6], "frame": [3, 6], "417312": 3, "voluntari": [3, 6], "context": [3, 6], "switch": [3, 6], "41": 3, "involuntari": [3, 6], "144": 3, "swap": [3, 6], "socket": [3, 6], "messag": [3, 4, 6], "sent": [3, 6], "receiv": [3, 6], "signal": [3, 6], "deliv": [3, 6], "byte": [3, 6], "4096": [3, 6], "exit": [3, 6], "statu": [3, 6], "inform": [3, 4], "kb": 3, "alon": 3, "As": 3, "11166863": 3, "j": [3, 5, 6], "maxrss": [3, 6], "1985340k": 3, "5000000": 3, "remov": 3, "rerun": 3, "ca": 3, "200": [3, 4], "mb": 3, "reason": 3, "sampl": 3, "increas": [3, 4], "40": [3, 4], "two": [3, 4, 5], "again": 3, "accur": 3, "rough": 3, "estim": [3, 6], "typic": [3, 4, 5], "everi": [3, 4], "30": 3, "miss": 3, "peak": 3, "skip": 3, "chang": [3, 5], "highlight": 3, "charact": 3, "drastic": 3, "observ": 3, "massiv": 3, "explain": [3, 4], "Being": 4, "abl": 4, "spent": 4, "rel": 4, "simpl": 4, "ani": [4, 6], "point": 4, "detail": 4, "request": [4, 5], "realli": 4, "am": 4, "websit": 4, "x": 4, "particular": 4, "featur": 4, "hand": 4, "therefor": 4, "verifi": 4, "calibr": 4, "strategi": 4, "meaning": 4, "underus": 4, "wast": 4, "bodi": 4, "expect": 4, "pictur": 4, "posit": 4, "veloc": 4, "At": 4, "gravit": 4, "forc": 4, "pair": 4, "updat": 4, "act": 4, "subset": 4, "exchang": 4, "accept": 4, "network": [4, 5], "penalti": 4, "least": 4, "cost": [4, 5], "30000": 4, "10000": 4, "11385": 4, "sec": 4, "optimum": 4, "our": [4, 5], "web": 4, "click": 4, "wget": 4, "raw": 4, "githubusercont": 4, "ttt4hpc_resource_manag": 4, "main": 4, "build": 4, "sh": [4, 5], "usr": [4, 5], "mpicc": [4, 6], "o3": 4, "lm": 4, "crai": 4, "special": 4, "wrapper": 4, "cc": 4, "skill": 4, "overlook": 4, "debug": [4, 5], "short": 4, "necessari": 4, "get": [4, 5], "assum": 4, "proport": 4, "embark": 4, "113": 4, "realist": 4, "term": 4, "real": 4, "adapt": 4, "foss": 4, "2022b": 4, "srun": 4, "mpirun": 4, "mpiexec": 4, "256": 4, "power": 4, "grep": 4, "sort": 4, "419": 4, "213": 4, "63": 4, "33": 4, "34": 4, "94": 4, "12": 4, "92": [4, 6], "Or": [4, 5], "tabular": 4, "form": 4, "conclud": 4, "And": [4, 5, 6], "conclus": 4, "abov": [4, 5], "domin": 4, "bound": 4, "satur": 4, "non": 4, "amdahl": 4, "law": 4, "scheme": 4, "common": [4, 5], "exist": [4, 5], "task": 4, "its": 4, "via": 4, "wrote": 4, "softwar": 4, "somebodi": 4, "els": 4, "difficult": 4, "consult": 4, "manual": 4, "support": 4, "theirs": 4, "matlab": 4, "self": 4, "g": 4, "mpi4pi": 4, "multiprocess": 4, "tri": 5, "dimens": 5, "affect": 5, "thousand": 5, "those": [5, 6], "laptop": 5, "speed": 5, "login": 5, "like": [5, 6], "maitr": 5, "restaur": 5, "wide": 5, "rememb": 5, "plai": 5, "game": 5, "tetri": 5, "wikipedia": 5, "public": 5, "domain": 5, "look": 5, "calcul": 5, "place": 5, "rectangular": 5, "ey": 5, "word": 5, "keep": 5, "bottom": 5, "motiv": 5, "busi": 5, "start": 5, "soon": 5, "violet": 5, "green": 5, "area": 5, "rectangl": 5, "imagin": 5, "fulli": 5, "cube": 5, "backfil": 5, "pink": 5, "suddenli": 5, "crash": 5, "1500m": 5, "execut": 5, "sometim": 5, "etc": 5, "mycod": 5, "somepartit": 5, "handi": 5, "err": 5, "anoth": 5, "afterok": 5, "123456": 5, "arrai": 5, "tune": 5, "schedmd": 5, "html": 5, "my_job": 5, "week": 5, "did": 5, "colleagu": 5, "alreadi": 5, "pend": 5, "squeue": 5, "me": 5, "cancel": 5, "scancel": 5, "jobid": 5, "minut": 5, "grow": 5, "separ": 5, "episod": 5, "iter": 5, "advantag": 5, "disadvantag": 5, "mention": 5, "earlier": 5, "color": 5, "grai": 5, "benefici": 5, "smaller": 5, "sequenc": 5, "cut": 5, "checklist": 6, "entir": 6, "10404698": 6, "3210588k": 6, "62": 6, "03": 6, "408884": 6, "91345": 6, "10404725": 6, "id": 6, "someus": 6, "state": 6, "93": 6, "walltim": 6, "01": 6}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"exercis": 0, "virtual": 0, "environ": 0, "1": 0, "2": 0, "option": [0, 6], "3": 0, "4": 0, "meteorolog": 0, "data": [0, 2], "process": 0, "x": 0, "bring": 0, "your": 0, "own": 0, "code": [0, 3, 4, 6], "issu": [0, 2], "tuesdai": 1, "tool": 1, "techniqu": 1, "hpc": 1, "real": 1, "life": 1, "comput": 1, "cluster": [1, 5], "workflow": [1, 2], "prerequisit": [1, 2], "episod": 1, "time": [1, 3, 4, 6], "who": 1, "i": [1, 2, 3, 4, 5, 6], "cours": 1, "credit": 1, "o": 2, "best": 2, "practic": 2, "object": 2, "quick": 2, "primer": 2, "how": [2, 3, 4, 5, 6], "file": 2, "ar": 2, "access": 2, "format": 2, "demo": 2, "expect": 2, "result": 2, "share": 2, "network": 2, "system": [2, 4], "explan": 2, "filesystem": 2, "slow": 2, "typic": 2, "transfer": 2, "speed": 2, "common": 2, "local": 2, "disk": 2, "ram": 2, "ramdisk": 2, "machin": 2, "learn": [2, 4, 5], "larg": 2, "summari": 2, "see": 2, "also": 2, "measur": 3, "choos": [3, 4, 5], "right": 3, "amount": 3, "memori": 3, "why": [3, 4], "matter": [3, 4], "run": [3, 4, 6], "test": [3, 6], "job": [3, 5], "befor": [3, 4], "mani": 3, "similar": 3, "get": 3, "more": 3, "you": 3, "need": 3, "exampl": [3, 4, 5], "find": 3, "high": 3, "water": 3, "mark": 3, "prepend": 3, "usr": [3, 6], "bin": [3, 6], "v": 3, "our": 3, "goal": [3, 4, 5], "sacct": [3, 6], "conclus": 3, "sometim": 3, "answer": 3, "rewrit": 3, "number": 4, "core": 4, "seri": [4, 5], "beyond": 4, "scope": 4, "thi": [4, 6], "tutori": 4, "project": 4, "simul": 4, "motion": 4, "planet": 4, "download": 4, "compil": [4, 6], "we": [4, 6], "start": 4, "let": 4, "u": 4, "make": 4, "small": 4, "possibl": [4, 6], "smaller": 4, "calcul": 4, "vari": 4, "If": 4, "doe": 4, "scale": 4, "what": [4, 5], "can": [4, 6], "reason": 4, "mpi": [4, 6], "openmp": 4, "tell": 4, "schedul": 5, "slurm": [5, 6], "basic": 5, "supercomput": 5, "A": 5, "visual": 5, "analogi": 5, "discuss": 5, "script": [5, 6], "submit": 5, "monitor": 5, "paramet": 5, "independ": 5, "task": 5, "resourc": 5, "us": 5, "uneven": 5, "lesson": 6, "avail": 6, "c": 6, "It": 6, "python": 6, "seff": 6}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 8, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx": 57}, "alltitles": {"Exercises": [[0, "exercises"]], "Virtual environments": [[0, null]], "Exercise 1.1": [[0, "exercise-1-1"]], "Exercise 1.2 (optional)": [[0, "exercise-1-2-optional"]], "Exercise 1.3": [[0, "exercise-1-3"]], "Exercise 1.4 (optional)": [[0, "exercise-1-4-optional"]], "Exercise 2.1": [[0, "exercise-2-1"]], "Exercise 2.2": [[0, "exercise-2-2"]], "Exercise 2.3": [[0, "exercise-2-3"]], "Exercise 2.4: Meteorological data processing": [[0, "exercise-2-4-meteorological-data-processing"]], "Exercise X: Bring your own code and issues": [[0, "exercise-x-bring-your-own-code-and-issues"]], "Tuesdays tools and techniques for HPC: Real-life compute cluster workflows": [[1, "tuesdays-tools-and-techniques-for-hpc-real-life-compute-cluster-workflows"]], "Prerequisites": [[1, "prerequisites-0"], [2, "prerequisites-0"]], "Episodes and timing": [[1, "episodes-and-timing"]], "Who is the course for?": [[1, "who-is-the-course-for"]], "Credits": [[1, "credits"]], "I/O Best Practices": [[2, "i-o-best-practices"]], "Objectives": [[2, "objectives-0"]], "Quick primer: How files are accessed": [[2, "quick-primer-how-files-are-accessed"]], "Data Format Demos": [[2, "data-format-demos"]], "expected result": [[2, null], [2, null], [2, null], [2, null], [2, null]], "I/O Workflows": [[2, "i-o-workflows"]], "Shared and Network File Systems": [[2, "shared-and-network-file-systems"]], "Explanation of shared network filesystems": [[2, null]], "File System is Slow": [[2, "file-system-is-slow"]], "Typical transfer speeds": [[2, null]], "Common Issues": [[2, "common-issues"]], "Local Disks and RAM Disks": [[2, "local-disks-and-ram-disks"]], "Local Disks": [[2, "local-disks"]], "Ramdisk": [[2, "ramdisk"]], "Machine Learning and Large data": [[2, "machine-learning-and-large-data"]], "Summary": [[2, "summary"]], "See also": [[2, "see-also"]], "Measuring and choosing the right amount of memory": [[3, "measuring-and-choosing-the-right-amount-of-memory"]], "Why it matters": [[3, "why-it-matters"], [4, "why-it-matters"]], "Run a test job before running many similar jobs": [[3, "run-a-test-job-before-running-many-similar-jobs"]], "How to get more memory if you need it": [[3, "how-to-get-more-memory-if-you-need-it"]], "Example code": [[3, "example-code"]], "Finding the memory high-water mark by prepending with /usr/bin/time -v": [[3, "finding-the-memory-high-water-mark-by-prepending-with-usr-bin-time-v"]], "Our goal": [[3, null]], "Finding the memory high-water mark with sacct": [[3, "finding-the-memory-high-water-mark-with-sacct"]], "Conclusions": [[3, null]], "Sometimes the answer is not more memory but to rewrite the code": [[3, "sometimes-the-answer-is-not-more-memory-but-to-rewrite-the-code"]], "How to choose the number of cores by timing a series of runs": [[4, "how-to-choose-the-number-of-cores-by-timing-a-series-of-runs"]], "Learning goals": [[4, null], [5, null]], "Beyond the scope of this tutorial": [[4, null]], "Example project: simulating the motion of planets": [[4, "example-project-simulating-the-motion-of-planets"]], "How to download and compile the example code": [[4, "how-to-download-and-compile-the-example-code"]], "Before we start: let us make the system as small as possible, but not smaller": [[4, "before-we-start-let-us-make-the-system-as-small-as-possible-but-not-smaller"]], "Series of calculations by varying the number of cores": [[4, "series-of-calculations-by-varying-the-number-of-cores"]], "If it does not scale, what can be possible reasons?": [[4, "if-it-does-not-scale-what-can-be-possible-reasons"]], "What is MPI and OpenMP and how can I tell?": [[4, "what-is-mpi-and-openmp-and-how-can-i-tell"]], "Job scheduling and Slurm basics": [[5, "job-scheduling-and-slurm-basics"]], "What is a supercomputer or cluster?": [[5, "what-is-a-supercomputer-or-cluster"]], "What is Slurm?": [[5, "what-is-slurm"]], "A visual analogy": [[5, "a-visual-analogy"]], "Discussion": [[5, "discussion-0"], [5, "discussion-1"], [5, "discussion-2"]], "Example Slurm job script": [[5, "example-slurm-job-script"]], "Submitting and monitoring a Slurm job": [[5, "submitting-and-monitoring-a-slurm-job"]], "How to choose job parameters": [[5, "how-to-choose-job-parameters"]], "What if the job is a series of independent tasks?": [[5, "what-if-the-job-is-a-series-of-independent-tasks"]], "What if the resource use of a job is uneven?": [[5, "what-if-the-resource-use-of-a-job-is-uneven"]], "How to test this lesson": [[6, "how-to-test-this-lesson"]], "Slurm is available": [[6, "slurm-is-available"]], "We can compile a C code with MPI": [[6, "we-can-compile-a-c-code-with-mpi"]], "It is possible to run a Python script": [[6, "it-is-possible-to-run-a-python-script"]], "sacct is available": [[6, "sacct-is-available"]], "/usr/bin/time is available": [[6, "usr-bin-time-is-available"]], "Optional: seff": [[6, "optional-seff"]]}, "indexentries": {}})