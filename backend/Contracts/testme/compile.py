
# what this fucking shit does is take in one argument and install that shit and compile 

import sys
from boa.compiler import Compiler 

Compiler.load_and_save(sys.argv[1])