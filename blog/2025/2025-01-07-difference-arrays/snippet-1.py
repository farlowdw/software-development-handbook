def get_modified_array_brute_force(length, updates):
    res = [0] * length
    for left, right, val in updates:        # for each update,
        for i in range(left, right + 1):    # update each element in res
            res[i] += val
    return res

def get_modified_array_w_difference_array(length, updates):
    diff = [0] * length
    for left, right, val in updates:
        diff[left] += val               # increment by val at each left boundary
        if right + 1 < length:          # decrement by val beyond each right boundary
            diff[right + 1] -= val      #   (unless the right boundary is the end of the array)
    
    res = [0] * length
    curr_diff = 0                       # maintain running sum of elements in diff array
    for i in range(length):
        curr_diff += diff[i]
        res[i] = curr_diff
    
    return res

length = 5
updates = [[1,3,2],[2,4,3],[0,2,-2]]
print(get_modified_array_brute_force(length, updates))          # [-2,0,3,5,3]
print(get_modified_array_w_difference_array(length, updates))   # [-2,0,3,5,3]