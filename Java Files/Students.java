import java.io.*;
import java.util.*;

public class Students
{
	public static void main(String[] args) throws IOException,FileNotFoundException
	{
		PrintWriter pw = new PrintWriter(new File("Students.csv"));		
		BufferedReader br = new BufferedReader(new FileReader("Electrical Engineering Students.csv"));
		String line = "";
		int count = 0;
		while((line = br.readLine()) != null)
		{
			count++;				
			String[] values = line.split(",");
			System.out.println(values.length+"\t"+count);
			values[0] = values[0].toUpperCase();
			if(values[2].equals("NULL"))
			{
				values[2] = "0";
			}
			if(values[3].equals("NULL"))
			{
				values[3] = "Day Scholar";
			}
			if(values[4].equals("NULL"))
			{
				values[4] = "M";
			}
			String s = values[0]+","+values[1]+","+values[2]+","+values[3]+","+values[4]+"\n";
			pw.write(s);
		}
		pw.close();
		br.close();
	}
}
