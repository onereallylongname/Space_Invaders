### Rules v1.1
##### Rules for commit and comments
|Operation   | Meaning
|------------|---------------------
| -          | separator
| ( ... )    | block, operation applies to block
| _L         | in line
| _F         | file
| _R         | reason
| _O         | objective
| _U         | update
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
git commit -m "_Add_F lib/new_file.txt - _Changed_F new_file.txt _L 15 _Add  way to say banana after transaction without baby knowing _O enjoy the ride - _U_L 1 (_F file1 _F file2) _O describe file "
```
