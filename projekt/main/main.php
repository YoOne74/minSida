<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Te24a</title>
</head>
<body>

    <header style="text-align:center;margin-top:5vh;"><h1>Välkomna till Webbutveckling 1!</h1></header>
    <main>
        <p style="text-align:center;">Här nedanför kommer ni kunna hitta er och varandras hemsidor.</p>

        <div id="container">

            <?php
                $dir = '/C'; // Current directory
                $directories = [];

                // Open the directory
                if (is_dir($dir)) {
                    if ($dh = opendir($dir)) {
                        while (($file = readdir($dh)) !== false) {
                            if ($file !== '.' && $file !== '..' && is_dir($dir . $files) {
                                $directories[] = $file;
                            }
                        }
                        closedir($dh);
                    }
                }

                // Display the directories as clickable links
                if (!empty($directories)) {
                    natcasesort($directories);
                    foreach ($directories as $directory) {
                        $capitalDirectory= ucfirst($directory);
                        echo "<div class='länkar'><a href=$directory class='link'><img src='_EXEMPEL_/php/$capitalDirectory.png' alt='bild av $capitalDirectory hemsida'><p></p></a></div>";
                    }
                } else {
                    echo "<p>Whoops! Inga undermappar hittades.</p>";
                }
            ?>
        
        </div>
    </main>
</body>
<style>
    body{
        margin: 0;
        color: white;
        background-color: black;

    }

    a{
    text-decoration: none;
    }
    
    a:visited {
    color: rgb(235, 235, 235);
    }

    /* mouse over link */
    a:hover {
        color: rgb(255, 0, 212);
    }

    /* selected link */
    a:active {
        color: rgb(230, 0, 255);
    }


    .länkar a{


        img{
            width: 95%;
            height: 90%;

            object-fit: contain;
        }

        p{
            margin-top: 0;
            margin-bottom: 2px;

        }

        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        justify-content: space-between;

    

        outline: 2px white solid;

        margin-left: 5vw;
        margin-top: 5vh;

        padding: 10px;
        border-radius: 10px;

        height: 15vh;
        width: 17vw;


    }
    #container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        width: 100vw;
    }
</style>
</html>
