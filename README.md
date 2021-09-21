# 🎰 Jackpot reel

Demo: https://lipsumarium.com/jackpot-reels?reelsCount=3&reelA=4&reelB=4&reelC=3&combinations=1-2-3,2-2-2,3-3-3

## How to use

1. Download all files (the green "code" button > Download ZIP)
2. Unzip
3. Modify files in `src/items` (`1.jpg`, `2.jpg`, etc..)
4. Open `src/index.html`
5. Press any key to spin the reels
6. Profit 💰

## Parameters

Add parameters to the URL like so: `...index.html?param=value&param2=value2`

| Parameter      | Description                                                              | Default |
| -------------- | ------------------------------------------------------------------------ | ------- |
| `reelsCount`   | Number of reels                                                          | 3       |
| `reelA`        | Number of images in reel A. For the 2nd reel, `reelB`, etc..             | 1       |
| `combinations` | The combinations that will come out, separated by comas                  | 1-1-1   |
| `duration`     | Time in second for the reels to spin                                     | 5       |
| `groups`       | The "length" of the reel. How many time images in each reel are repeated | 4       |

### Example

```
?reelsCount=2&reelA=4&reelB=5&combinations=1-2,3-3,3-2
```

For 2 reels, with 4 images in the first one and 5 images in the second.

The combinations that will come out are:

1. 1-2
2. 3-3
3. 3-2
