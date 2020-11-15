import java.io.*;
import java.util.*;

public class Land
{
	public static void main(String[] args) throws FileNotFoundException
	{
		String[] countries = {"Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua", "Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia", "Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre","Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts","Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad","Tobago","Tunisia","Turkey","Turkmenistan","Turks","Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"};
		String[] usernames = {"ignoramusfreak","mineralcentaurs","rosaceaslither","importanceproducer","flexenvelope","raggedmango","easterbellhop","yearsoxford","parchmentsheet","limitingcarrier","gallopinglog","elaboratedmasses","malaysianouzel","roguecatered","kuiperinfinite","monkeytrousers","purebredfilm","bookmarkleft","actinlinear","planetabusive"};
		String[] landNames = {"Eachothis","Daklomelan","Vubrerynn","Aestamar","Zeavoxus","The Soul Nexus","The Regal Isles","The Ageless Empire","The Argent Region","The Hollow Province","Blattearune","Gleaqiopia","Phokiorath","Taklinara","Loggother","The Infernal Earth","The Glowing Territory","The Transient Region","The Dual Dominion","The Hallowed Domain"};
		Random idRand = new Random();
		Random countryRand = new Random();
		ArrayList<String> usernamesArr = new ArrayList<String>();
		ArrayList<String> landNamesArr = new ArrayList<String>();
		for(int i=0;i<20;i++)
		{
			usernamesArr.add(usernames[i]);
			landNamesArr.add(landNames[i]);
		}
		PrintWriter pw = new PrintWriter(new File("Land Data.csv"));
		for(int i=0;i<20;i++)
		{
			int index = idRand.nextInt(usernamesArr.size());
			String s = (landNamesArr.get(index)+","+countries[countryRand.nextInt(countries.length)]+","+usernamesArr.get(index)+"\n");
			usernamesArr.remove(index);
			landNamesArr.remove(index);
			pw.write(s);
		}
		pw.close();
	}
}
