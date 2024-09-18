Kadane's algorithm can be somewhat confusing at first. The key to understanding lies in effectively interpreting why the updates to `curr_sum` and `max_sum` happen in the way that they do:

- `curr_sum = max(num, curr_sum + num)`
  + We decide whether to extend the previous subarray by including the current element or to start a new subarray beginning at the current element:
    * *Extend:* The previous subarray with sum `curr_sum` is extended to include `num`, the current element: `curr_sum = curr_sum + num`
    * *New:* If `curr_sum` is negative (i.e., `num > curr_sum + num`), then we should effectively reset the subarray whose sum we're currently tracking to be the 1-element subarray containing the current element: `curr_sum = num`
  + If `current_sum + num` is larger, then we *extend* the previous subarray.
  + If `num` is larger, then we *start a new subarray* at index `i` with the single element `nums[i]`.
- `max_sum = max(max_sum, curr_sum)`
  + Compare the maximum subarray sum found thus far, `max_sum`, with the maximum subarray sum ending at the current index, `curr_sum`.
  + Keep the larger of the two.