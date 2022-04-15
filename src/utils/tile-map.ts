export class RandomMaze {
  private boxSize = 4  
  private smallBoxSize = 4
  private wLength = 40
  private hLength = 40
  public matrix = {}
  public points = {}
  public counter = {}
  private Tile = {
    FLOOR: 0,
    WALL: 1
  }
  constructor () {
    
  }

  checkWallsA(idx) {
    let b, a = 0 
    const d = [];
    const {hLength, wLength, matrix, Tile} = this
    for (b = 0; b < hLength; b++)
        for (d[b] = [],
        a = 0; a < wLength; a++)
            d[b][a] = matrix[idx][b][a];
    for (a = 0; a < hLength; a++)
        for (let e = 0; e < wLength; e++) {
            b = 0;
            for (let f = a - 1; f <= a + 1; f++)
                for (let g = e - 1; g <= e + 1; g++)
                    if (f != a || g != e)
                        0 > f || 0 > g || f == hLength || g == wLength ? b++ : matrix[idx][f][g] == Tile.WALL && b++;
            d[a][e] = matrix[idx][a][e] == Tile.WALL ? 4 <= b ? Tile.WALL : Tile.FLOOR : 5 <= b ? Tile.WALL : Tile.FLOOR
        }
    for (b = 0; b < hLength; b++)
        for (a = 0; a < wLength; a++)
            matrix[idx][b][a] = d[b][a]
  }

  checkWallsB(idx) {
    let b, a, d, e, f, g, l, m = 0;
    const k = [];
    const {hLength, wLength, matrix, Tile, counter} = this
    for (a = 0; a < hLength; a++)
        for (k[a] = [], b = 0; b < wLength; b++)
          k[a][b] = matrix[idx][a][b];
    4 > counter[idx] ? (l = 5, m = 2) : (l = 5, m = 0);
    for (a = 1; a < hLength - 1; a++)
        for (b = 1; b < wLength - 1; b++) {
            g = f = 0;
            for (d = -1; 1 >= d; d++)
                for (e = -1; 1 >= e; e++)
                    matrix[idx][a + d][b + e] != Tile.FLOOR && f++;
            for (d = a - 2; d <= a + 2; d++)
                for (e = b - 2; e <= b + 2; e++)
                    if (2 != Math.abs(d - a) || 2 != Math.abs(e - b))
                        0 > d || 0 > e || d >= hLength || e >= wLength || matrix[idx][d][e] != Tile.FLOOR && g++;
            k[a][b] = f >= l || g <= m ? Tile.WALL : Tile.FLOOR
        }
    for (a = 0; a < hLength; a++)
        for (b = 0; b < wLength; b++)
            matrix[idx][a][b] = k[a][b]
  }

  initData(idx) {
    const {hLength, wLength, matrix, Tile, counter, points} = this
    points[idx] = [];
    matrix[idx] = [];
    for (let m = 0; m < hLength; m++) {
      matrix[idx][m] = [];
      for (let n = 0; n < wLength; n++) {
        let value =  Math.random() > 0.6 ? Tile.WALL : Tile.FLOOR;
        if (m < 5 || n < 5 || m > hLength - 4 || n > wLength - 4) {
        // if (0 == m || 0 == n || m == hLength - 1 || n == wLength - 1) {
          value = Tile.WALL 
        }
        matrix[idx][m][n] = value
        points[idx].push({
            row: m,
            col: n,
            value: value
        })
      }      
    }
    counter[idx] = 0
  }   
}