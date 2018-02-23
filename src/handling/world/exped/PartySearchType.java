package handling.world.exped;

public enum PartySearchType {
    Kerning(20, 255, 1000, false),
    Ludi(30, 255, 1001, false),
    Orbis(50, 255, 1002, false),
    Pirate(60, 255, 1003, false),
    Magatia(70, 255, 1004, false),
    ElinForest(40, 255, 1005, false),
    Pyramid(40, 255, 1008, false),
    Dragonica(100, 255, 1009, false), //what the fk
    Hoblin(80, 255, 1011, false),
    Henesys(10, 255, 1012, false),
    Dojo(25, 255, 1013, false),

    Balrog_Normal(50, 255, 2001, true),
    Zakum(50, 255, 2002, true),
    Horntail(80, 255, 2003, true),
    PinkBean(140, 255, 2004, true),
    ChaosZakum(100, 255, 2005, true),
    ChaosHT(110, 255, 2006, true),
    CWKPQ(90, 255, 2007, true),
    VonLeon(120, 255, 2008, true),
    Hilla(120, 255, 2009, true);

    public int id, minLevel, maxLevel, timeLimit;
    public boolean exped;
    private PartySearchType(int minLevel, int maxLevel, int value, boolean exped) {
	this.id = value;
	this.minLevel = minLevel;
	this.maxLevel = maxLevel;
	this.exped = exped;
	this.timeLimit = exped ? 20 : 5;
    }

    public static PartySearchType getById(int id) {
	for (PartySearchType pst : PartySearchType.values()) {
	    if (pst.id == id) {
		return pst;
	    }
	}
	return null;
    }
}
