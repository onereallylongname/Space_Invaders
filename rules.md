### Rules v1.0
|Operation   | Meaning
|------------|---------------------
| _L         | in line
| _F         | file
| _R         | reason
| _O         | objective
| _Add       | add/added feature
| _Add_L     | add/added line
| _Add_F     | add/added file
| _Create    | develop feature
| _Create_F  | create file
| _Change    | change feature
| _Change_L  | change line
| _Change_F  | change file

#### Combining operations
_OP1 and _OP2 -> _OP1_OP2 : _Add and _L -> _Add_L
##### Example
```
git commit -m "_Add_F lib/new_file.txt - _Changed_F new_file.txt _L 15 _Add  way to say banana after transaction without baby knowing _O enjoy the ride" 
```
