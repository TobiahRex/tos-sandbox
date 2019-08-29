declare lower;

input TimeFrame = 10;
plot rsiYellow = ExpAverage(RSI(), TimeFrame * 8) - 50;
rsiYellow.SetLineWeight(2);
rsiYellow.SetDefaultColor(Color.YELLOW);
rsiYellow.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);


plot OB = 10;
input BuyLine = 5;
plot OS = -10;
input SellLine = -5;
plot zero = 0;

plot BuyZone = BuyLine;
plot SellZone = SellLine;

OB.SetDefaultColor(Color.MAGENTA);
OS.SetDefaultColor(Color.LIGHT_GREEN);
BuyZone.SetDefaultColor(Color.RED);
SellZone.SetDefaultColor(Color.GREEN);
zero.SetDefaultColor(Color.YELLOW);
zero.SetPaintingStrategy(PaintingStrategy.LINE);

def rsiDef =  (rsiYellow - rsiYellow[1]);
plot rsiSpeed = ExpAverage(rsiDef, 8) * 25;
plot rsiSpeed2 = ExpAverage(rsiDef, 13) * 25;
plot rsiSpeed3 = ExpAverage(rsiDef, 21) * 25;

rsiSpeed.SetDefaultColor(Color.CYAN);
rsiSpeed2.SetDefaultColor(Color.DARK_ORANGE);
rsiSpeed3.SetDefaultColor(Color.MAGENTA);
rsiSpeed.SetLineWeight(2);
rsiSpeed2.SetLineWeight(3);
rsiSpeed3.SetLineWeight(3);
rsiSpeed.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);

def buyCross_1 = rsiSpeed crosses above rsiSpeed2;
def buyCross_2 = rsiSpeed crosses above rsiSpeed3;
def sellCross_1 = rsiSpeed crosses below rsiSpeed2;
def sellCross_2 = rsiSpeed crosses below rsiSpeed3;

plot buyCross1 = if (
            rsiSpeed >= 0 && buyCross_1
        ) then -14
    else if (
            rsiSpeed < 0 && buyCross_1
        ) then 14
    else Double.NaN;


plot buyCross2 = if (
            rsiSpeed >= 0 && buyCross_2
        ) then -12
    else if (
            rsiSpeed < 0 && buyCross_2
        ) then 12
    else Double.NaN;


plot sellCross1 = if (
            rsiSpeed >= 0 && sellCross_1
        ) then -14
    else if (
            rsiSpeed < 0 && sellCross_1
        ) then 14
    else Double.NaN;

plot sellCross2 = if (
            rsiSpeed >= 0 && sellCross_2
        ) then -12
    else if (
            rsiSpeed < 0 && sellCross_2
        ) then 12
    else Double.NaN;

buyCross1.SetDefaultColor(Color.DARK_ORANGE);
buyCross2.SetDefaultColor(Color.Magenta);
buyCross1.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
buyCross2.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
sellCross1.SetDefaultColor(Color.Dark_Orange);
sellCross2.SetDefaultColor(Color.Magenta);
sellCross1.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
sellCross2.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

AddCloud(0, SellZone, Color.GREEN);
AddCloud(BuyZone, 0, Color.RED);
