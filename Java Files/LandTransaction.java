import java.io.*;
import java.util.*;

public class LandTransaction
{
	public static void main(String[] args)throws FileNotFoundException
	{
		String[] landNames = {"Eachothis","Daklomelan","Vubrerynn","Aestamar","Zeavoxus","The Soul Nexus","The Regal Isles","The Ageless Empire","The Argent Region","The Hollow Province","Blattearune","Gleaqiopia","Phokiorath","Taklinara","Loggother","The Infernal Earth","The Glowing Territory","The Transient Region","The Dual Dominion","The Hallowed Domain"};
		String[] usernames = {"ignoramusfreak","mineralcentaurs","rosaceaslither","importanceproducer","flexenvelope","raggedmango","easterbellhop","yearsoxford","parchmentsheet","limitingcarrier","gallopinglog","elaboratedmasses","malaysianouzel","roguecatered","kuiperinfinite","monkeytrousers","purebredfilm","bookmarkleft","actinlinear","planetabusive"};
		Random idRand = new Random();
		Random idRand1 = new Random(5000);
		PrintWriter pw = new PrintWriter(new File("Land Transaction Data.csv"));
		for(int i=0;i<20;i++)
		{
			String s = landNames[idRand.nextInt(20)]+","+usernames[idRand1.nextInt(20)]+"\n";
			pw.write(s);
		}
		pw.close();
	}
}
