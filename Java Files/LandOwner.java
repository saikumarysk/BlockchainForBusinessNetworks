import java.io.*;
import java.util.*;

public class LandOwner
{
	public static void main(String[] args) throws FileNotFoundException
	{
		PrintWriter pw = new PrintWriter(new File("Land Owner Data.csv"));
		String[] usernames = {"ignoramusfreak","mineralcentaurs","rosaceaslither","importanceproducer","flexenvelope","raggedmango","easterbellhop","yearsoxford","parchmentsheet","limitingcarrier","gallopinglog","elaboratedmasses","malaysianouzel","roguecatered","kuiperinfinite","monkeytrousers","purebredfilm","bookmarkleft","actinlinear","planetabusive"};
		String[] names = {"Shannon Stone","Mira Lucas","Chase Fleming","Kiera Carlson","Kyson Marquez","Shyann Elliott","Alden Bryant","Leah Moore","Britney Ross","Matthew Woodard","Abby Terry","Talan Dalton","Ashlynn Hebert","Dennis Strong","Nick Pearson","Anastasia Crane","Reed Harper","Baron Travis","Andres Underwood","Tristin Shannon"};
		Random idRand = new Random();
		ArrayList<String> namesArr = new ArrayList<String>();
		ArrayList<String> usernamesArr = new ArrayList<String>();
		for(int i=0;i<20;i++)
		{
			namesArr.add(names[i]);
			usernamesArr.add(usernames[i]);
		}
		
		for(int i=0;i<20;i++)
		{
			int index = idRand.nextInt(namesArr.size());
			String s = usernamesArr.get(index)+","+namesArr.get(index)+"\n";
			namesArr.remove(index);
			usernamesArr.remove(index);
			pw.write(s);
		}
		pw.close();
	}
}
