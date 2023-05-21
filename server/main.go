package main

import (
	"os"
	"portofolio/database"
	"portofolio/pkg/mysql"
	"portofolio/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to Load Environment")
	}

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	mysql.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("api/v1"))

	e.Static("/uploads", "/uploads")

	PORT := os.Getenv("PORT")

	// fmt.Println("server running on PORT: 5000")
	// e.Logger.Fatal(e.Start(":5000"))
	e.Logger.Fatal(e.Start(":" + PORT))
}
