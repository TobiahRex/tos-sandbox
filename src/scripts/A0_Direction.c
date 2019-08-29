#####---A0_RSI_MOMO_MTF "Medium Time Frame"---#####

#---Date Complete: October 16, 2015

declare lower;


#-------Global Inputs

input TimeFrame = 10;

#-------Global Variables

    #---Local Inputs for MED TF RSI
input RSI_MED_TF_AverageType = AverageType.Exponential;

    #---Variables for MED TF RSI
def TF_med_length = TimeFrame * 14;

def TF_med = (close[1] + close[TimeFrame]) / 2;

def Med_TF_NetChangeAvg = MovingAverage(RSI_MED_TF_AverageType, TF_med - TF_med[1], TF_med_length);

def Med_TF_TotChangeAvg = MovingAverage(RSI_MED_TF_AverageType, AbsValue(TF_med - TF_med[1]), TF_med_length);

def Med_TF_ChgRatio = if Med_TF_TotChangeAvg != 0 then (Med_TF_NetChangeAvg / Med_TF_TotChangeAvg) else 0;

plot RSI = 50 * (1 + Med_TF_ChgRatio) - 50;
def RSI_Avg = SimpleMovingAvg(RSI, 8);

    #---Local Inputs for MED TF MOMENTUM "MOMO" V2

def Med_MOMOValue1 = 5;

def Med_MOMOValue2 = 55;

def Med_MOMOAvg = 13;

def Med_MOMO_Type = AverageType.EXPONENTIAL;

def Med_MOMOslow = 55;

def Med_MOMO_SlowType = AverageType.EXPONENTIAL;

    #---Local Variables for MED TF MOMENTUM "MOMO" V2

def Med_TF_MOMOvalue1 = Med_MOMOValue1 * TimeFrame;

def Med_TF_MOMOvalue2 = Med_MOMOValue2 * TimeFrame;

def Med_TF_MOMOAvg1 = Med_MOMOAvg * TimeFrame;

def Med_TF_MOMOSlow1 = Med_MOMOslow * TimeFrame;

def Med_TF_MOMOValue = MovingAverage(Med_MOMO_Type, RSI, Med_TF_MOMOvalue1) - MovingAverage(Med_MOMO_Type, RSI, Med_TF_MOMOvalue2);

def Med_TF_MOMOAvg = MovingAverage(Med_MOMO_Type, Med_TF_MOMOValue, Med_TF_MOMOAvg1);

def Med_TF_MOMOSlow = MovingAverage(Med_MOMO_SlowType, Med_TF_MOMOValue, Med_TF_MOMOSlow1);


#END of MED V2

#---Local Clouds for MED TF MOMO
#AddCloud(Med_TF_MOMOValue, Med_TF_MOMOAvg, Color.Green, Color.Red);
#AddCloud(Med_TF_MOMOValue, Med_TF_MOMOAvg, Color.Green, Color.Red);
#AddCloud(Med_TF_MOMOAvg, Med_TF_MOMOSlow, Color.Green, Color.Red);


#---RSI Averages

input RSIrawAverage = 8;
input RSIEMAfast = 5;
input RSIEMAslow = 13;
input RSISMA = 34;


plot RSIrawEMA = ExpAverage(RSI(), TimeFrame * RSIrawAverage) - 50;

def RSIgreen = RSI > 9 or RSIrawEMA > 5;
def RSIred = RSI < -9 or RSIrawEMA < -5;

plot RSIfastEMA = ExpAverage(RSI, TimeFrame * RSIEMAfast);
def RSIslowEMA = ExpAverage(RSI, TimeFrame * RSIEMAslow);
def RSISlowMA = ExpAverage(RSI, TimeFrame * RSISMA);



plot OB = 10;
plot _ob = 5;
plot OS = -10;
plot _os = -5;

OB.setdefaultcolor(Color.Gray);
OS.setdefaultcolor(Color.Gray);
_ob.setdefaultColor(Color.Dark_GRAY);
_os.setdefaultColor(Color.Dark_GRAY);

#AddCloud(RSIrawEMA, RSIfastEMA, Color.Green, Color.Red);

RSI.AssignValueColor(if RSIgreen

then Color.GREEN else if RSIred
then Color.RED else Color.GRAY);

RSIrawEMA.SetDefaultColor(Color.Green);
RSIfastEMA.SetDefaultColor(Color.Red);

plot zero = 0;
zero.setdefaultcolor(Color.Yellow);
Zero.SetpaintingStrategy(PaintingStrategy.LINE);


plot Diff = (RSIrawEMA - RSIfastEMA) * 2;

Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", CreateColor(0, 155, 255));
Diff.DefineColor("Positive and Down", Color.BLUE);
Diff.DefineColor("Negative and Down", Color.PINK);
Diff.DefineColor("Negative and Up", Color.RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
