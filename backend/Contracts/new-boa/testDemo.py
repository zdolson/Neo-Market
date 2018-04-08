"""" making a generic testing case for neo-python """
 
""" Let's say I have a simple add contract with the arguments (operation, op1, op2) in testingContract.py

    Command: go into venv/bin/activate for python3.6
    python3.6 -m unittest testDemo.py 

    Assuming we want to test everything like Mackey's test cases 
    python3.6 -m unittest discover <directory with all the tests>/ 

        should output: k

""" 


class TestContract(BoaTest): 
    def test_Demo(self): 
        # # this loads up the place of where we should write the output and where the testContract name is located at 
        # output = Compiler.instance().load('%s/testingContract.py' % TestContract.dirname).default.write() 
        # tx, result, total_ops, engine = TestBuild(output, ['add', 1, 3], self.GetWallet1(), '070202', '02') # runs command to t3est the file 
        # self.assertEqual(len(result), 1) # checks the output of the file as 1 element 
        # self.assertEqual(result[0].GetBigInteger(), 4) # checks if the output matches the second arg


        output = Compiler.instance().load('%s/testingContract.py' % TestContract.dirname).default.write() 
        tx, result, total_ops, engine = TestBuild(output, '', self.GetWallet1(), '070202', '02') # runs command to t3est the file 
        self.assertEqual(len(result), 1) # checks the output of the file as 1 element 
        self.assertEqual(result[0].GetBigInteger(), 4) # checks if the output matches the second arg