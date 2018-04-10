# this will run prompt.py from here because im a bit lazy on setting the path myself
# will also take argument to select the condition of prompt.py otherwise go to the file itself and activate it
if [[ ! $# -eq 0 ]]
then
        # there is no argument passed soooooo continue on with default 
        python3 neo/bin/prompt.py -p
else
        # this will parse (heheh) the selected condition and pass to prompt.py 
        python3 neo/bin/prompt.py $1
fi
