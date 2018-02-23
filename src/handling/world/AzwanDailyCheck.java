
package handling.world;

import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.TimerTask;

/*
azwanCoinsAvail         int Returns how many coins total are available to be claimed for the day.
azwanCoinsRedeemed	int Returns how many coins total have been redeemed.
azwanCCoinsAvail	int Returns how many Conquerer's coins are available to be redeemed.
azwanECoinsAvail	intReturns how many Emp's coins are available to be redeemed.
 */
public class AzwanDailyCheck extends TimerTask {
    public void run() {
        Connection con = DatabaseConnection.getConnection();
        
        try {
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET azwanCoinsAvail = 0, azwanCoinsRedeemed = 0");
            ps.execute();
            ps.close();
            System.out.println("Successfully set azwanCoinsAvail and azwanCoinsRedeemed to zero.");
        } catch (SQLException e) {
            System.err.println("ERROR Running AzwanDailyCheck error: " + e);
        }
    }
}
