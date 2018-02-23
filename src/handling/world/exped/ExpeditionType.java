package handling.world.exped;

public enum ExpeditionType {
    Normal_Balrog(15, 2000, 45, 255),
    Horntail(30, 2003, 80, 255),
    Zakum(30, 2002, 50, 255),
    Chaos_Zakum(30, 2005, 100, 255),
    ChaosHT(30, 2006, 110, 255),
    Pink_Bean(30, 2004, 140, 255),
    Von_Leon(30, 2007, 120, 255),
    Arkarium(18, 2009, 120, 255),
    Cygnus(18, 2008, 170, 255),
    Hilla(30, 2010, 120, 255);

    public int maxMembers, maxParty, exped, minLevel, maxLevel;
    private ExpeditionType(int maxMembers, int exped, int minLevel, int maxLevel) {
	this.maxMembers = maxMembers;
	this.exped = exped;
	this.maxParty = (maxMembers / 2) + (maxMembers % 2 > 0 ? 1 : 0);
	this.minLevel = minLevel;
	this.maxLevel = maxLevel;
    }

    public static ExpeditionType getById(int id) {
	for (ExpeditionType pst : ExpeditionType.values()) {
	    if (pst.exped == id) {
		return pst;
	    }
	}
	return null;
    }
}
