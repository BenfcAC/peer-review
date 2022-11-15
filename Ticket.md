### Background

Product data will now include on sale products. The client will now provide data which includes a boolean flag `onSale` and an optional discount value with the key `discount`

`discount` will be provided as a percentage and will always be present when `onSale` is true.

We need the returned product to include the original price, sale price and discounted value in pounds.

### Acceptance Criteria

-   Product type updated to include `onSale`
-   Product type updated to include field `discount` required when `onSale` is true
-   Products are returned with their sale price
-   Products are returned with their discounted value in pounds
