from typing import *

class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        pass
    
sol = Solution()
s1 = "25525511135"
s2 = "0000"
s3 = "101023"
print(sol.restoreIpAddresses(s1)) # ["255.255.11.135","255.255.111.35"]
print(sol.restoreIpAddresses(s2)) # ["0.0.0.0"]
print(sol.restoreIpAddresses(s3)) # ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]