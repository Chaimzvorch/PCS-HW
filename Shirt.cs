using System.Drawing;

namespace shirt49 {
    public class Shirt {

    }
    public class CreateShirt {
        public string Color { get; set; }
        public string Pattern { get; set; }
        public CreateShirt() {

        }
        public CreateShirt(string color, string pattern) {
            Pattern = pattern;
            Color = color;

        }
       public static void Print(string col, string pat) {
            Console.WriteLine($"The color of the shirt is {col} and the pattern is {pat}");
        }

        static void Main(string[] args) {

            string[] color = { "red", "blue", "green" };
            string[] pattern = { "striped", "checked", "plain" };
            Shirt shirt = new Shirt();
            for (int i = 0; i < color.Length; i++)
            {
                for(int j = 0; i < pattern.Length; i++) {
                    Print(color[i], pattern[i]);
                };
            }

        }
           
        
    }
}
