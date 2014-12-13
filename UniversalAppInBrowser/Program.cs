namespace UniversalAppInBrowser
{
    using System.Diagnostics;
    using System.IO;

    class Program
    {
        static void Main(string[] args)
        {
            string sharedDir = "\"file://" + Directory.GetCurrentDirectory() + "..\\..\\..\\..\\AngularAgendaApp_Final\\AngularAgendaApp_Final.Shared\\default.html\"";

            var proc1 = new ProcessStartInfo();
            string anyCommand = "chrome.exe " + sharedDir + " -disable-web-security";
            proc1.UseShellExecute = true;

            proc1.WorkingDirectory = @"C:\\Program Files (x86)\\Google\\Chrome\\Application\\";

            proc1.FileName = @"C:\Windows\System32\cmd.exe";
            //proc1.Verb = "runas";
            proc1.Arguments = "/c " + anyCommand;
            proc1.WindowStyle = ProcessWindowStyle.Hidden;
            Process.Start(proc1);
        }
    }
}
