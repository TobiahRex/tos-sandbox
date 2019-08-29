
#==================================================================
#==========================Moving Averages=========================
#==================================================================
input fast = 8;
input medium = 21;
input slow = 55;
input slowest = 89;

def emaFast = ExpAverage(close, fast);
def emaSlow = ExpAverage(close, medium);
def smaFast = SimpleMovingAvg(close, slow);
def smaSlow = SimpleMovingAVg(close, slowest);

def buyAvgs = emaFast > smaFast;
def sellAvgs = emaFast < smaFast;

#==================================================================
#==========================A0 Direction===========================
#==================================================================
input timeFrame = 10;

def tfLength = timeFrame * 14;
def tfLengthAvg = (close[1] + close[timeFrame]) / 2;
def d_NetChangeAvg = MovingAverage(AverageType.Exponential, tfLengthAvg - tfLengthAvg[1], tfLength);
def d_TotChangeAvg = MovingAverage(AverageType.Exponential, AbsValue(tfLengthAvg - tfLengthAvg[1]), tfLength);
def d_ChgRatio = if d_TotChangeAvg != 0 then (d_NetChangeAvg / d_TotChangeAvg) else 0;

def d_RSI = 50 * (1 + d_ChgRatio) - 50;
def d_rsiGreen = ExpAverage(RSI(), timeFrame * 8) - 50;
def d_rsiRed = ExpAverage(d_RSI, timeFrame * 5);

#==================================================================
#==========================A0 Triggers 2===========================
#==================================================================


#--------------------------------
#------------RSI Math------------
#--------------------------------

def trig_NetChgAvg = MovingAverage(AverageType.EXPONENTIAL, close - close[1], 14);
def trig_TotChgAvg = MovingAverage(AverageType.EXPONENTIAL, AbsValue(close - close[1]), 14);
def trig_ChgRatio =
    if (trig_TotChgAvg != 0) then trig_NetChgAvg / trig_TotChgAvg
    else 0;
def trigRSI = 50 * (trig_ChgRatio + 1) ;

#---------------------------------------------------------------
#----- rsiValueDiff: The change in RSI Value relative to its last value
#----- trig_Speed: The average of Diff2 over 13 periods.
#---------------------------------------------------------------
def trig_rsiSma55 = (SimpleMovingAvg(trigRSI, 55) - 50) * 1.5;
def trig_rsiDiffExp = (ExpAverage(trigRSI, 8) - ExpAverage(RSI(), 34));
def trig_Speed = ExpAverage((trig_rsiDiffExp - trig_rsiDiffExp[1]), 13) * 10;

#------------------------
#--- dydx: The difference of 2 EXP Averages over a short distance (A)
#--- and the difference of 2 EXP Averages over a longer distance (B)
#--- and the difference between A & B, divided by a Medium distance.
#--- WHY ---:  Its meant to emulate how derivatives are calculated to provide instantaneous,
#--- change over time...ideally more responsive than "average".
#------------------------
def trig_rsiSmallDiff = ((ExpAverage(trigRSI, 8) * 1.7 - ExpAverage(RSI(), 13) * 1.7));
def trig_rsiLargeDiff = ((ExpAverage(trigRSI, 8) * 1.7 - ExpAverage(RSI(), 34) * 1.7));
def trig_dydxRSI = ((trig_rsiLargeDiff - trig_rsiSmallDiff) / 21) * 50;


#==================================================================
#====================== Buy & Sell Detection ======================
#==================================================================
input trig_SellLine = 9;
def trig_OverBought = trig_SellLine;

input trig_BuyLine = -9;
def trig_OverSold = trig_BuyLine;

def d_rsiDiff = d_rsiGreen - d_rsiRed;
def length = 100;
def zero = 0;
def diff = d_rsiGreen - d_rsiRed;
def SellDiff = (
    diff < 0
);
def BuyDiff = (
    diff > 0
);
def sellBasket = fold i = 0 to length with currentSell = Double.NEGATIVE_INFINITY while d_rsiDiff[i] < 0 do Max(currentSell, d_rsiDiff[i]);
def buyBasket = fold j = 0 to length with currentBuy = Double.POSITIVE_INFINITY while d_rsiDiff[j] > 0 do Min(currentBuy, d_rsiDiff[j]);

def BuyZone = (
 buyBasket != Double.POSITIVE_INFINITY
  && buyAvgs
  #&& d_rsiGreen >= 0
  && BuyDiff
  #&& (BuyDiff or (d_rsiGreen >= 0))
  #&& d_rsiRed > 0
);
def BuyTrigger = (
    trig_Speed <= trig_OverSold
    && (
      trig_Speed < trig_Speed[1]
      #&& (trig_Speed[4] > 0 or trig_Speed[3] > 0 or trig_Speed[2] > 0)
    )
);
def SellZone = (
 sellBasket != Double.NEGATIVE_INFINITY
  && sellAvgs
  #&& d_rsiGreen <= 0
  && SellDiff
  #&& (SellDiff or (d_rsiGreen <= 0))
  #&& d_rsiRed < 0
);

def SellTrigger = (
    trig_Speed >= trig_OverBought
    && (
      trig_Speed > trig_Speed[1]
      #&& (trig_Speed[4] < 0 or trig_Speed[3] < 0 or trig_Speed[2] < 0)
    )
);

#---------------------------------------------------------------
#----- Candle Conditions: Candle closes across multiple EMAs
#---------------------------------------------------------------
plot c_sell = (
    emaFast > emaSlow
    && open > emaFast
    && close < emaSlow
);
c_sell.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
c_sell.SetLineWeight(3);
c_sell.SetDefaultColor(Color.Orange);

plot c_buy = (
    emaFast < emaSlow
    && open < emaFast
    && close > emaSlowt
);
c_buy.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
c_buy.SetLineWeight(3);
c_buy.SetDefaultColor(Color.Yellow);


#==================================================================
#========================== Colors ================================
#==================================================================
input d_rsiOB = 8;
input d_rsiOS = -8;
plot Overbought = d_RSI > d_rsiOB;
plot Oversold = d_RSI < d_rsiOS;

Overbought.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Oversold.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Overbought.SetDefaultColor(Color.Magenta);
Oversold.SetDefaultColor(Color.Cyan);

plot StrongBUY = BuyZone && BuyTrigger;
plot StrongSELL = SellZone && SellTrigger;
StrongBUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
StrongSELL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
StrongBUY.SetDefaultColor(color.Cyan);
StrongBUY.SetLineWeight(5);
StrongSELL.SetDefaultColor(Color.Magenta);
StrongSELL.SetLineWeight(5);

plot Exit = (
  SellZone && BuyTrigger
) or (
  BuyZone && SellTrigger
);
Exit.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Exit.SetDefaultColor(Color.Yellow);
Exit.SetLineWeight(5);


AssignPriceColor(
    if c_buy then Color.Yellow
    else if c_sell then Color.Orange
    else if StrongBUY then Color.green
    else if StrongSELL then Color.red
    else if BuyZone then Color.green
    else if SellZone then Color.red
    else Color.Gray
  );
