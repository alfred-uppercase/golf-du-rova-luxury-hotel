import clubhousePhoto from "@/assets/real-clubhouse.png.asset.json";
import flagPhoto from "@/assets/real-flag.png.asset.json";
import expSuite from "@/assets/home-suite-premium.png.asset.json";
import expGolf from "@/assets/home-golf-historique.png.asset.json";
import expSpa from "@/assets/home-sanctuaire.png.asset.json";
import proshop from "@/assets/golf-proshop.png.asset.json";
import practice from "@/assets/golf-practice.png.asset.json";
import golfClubhouse from "@/assets/golf-clubhouse.png.asset.json";

/** Original photos, used until a new one is uploaded from the admin. */
export const DEFAULT_IMAGES: Record<string, string> = {
  "home.img.story1": clubhousePhoto.url,
  "home.img.story2": flagPhoto.url,
  "home.img.exp.suite": expSuite.url,
  "home.img.exp.golf": expGolf.url,
  "home.img.exp.spa": expSpa.url,
  "golf.img.proshop": proshop.url,
  "golf.img.practice": practice.url,
  "golf.img.clubhouse": golfClubhouse.url,
};
