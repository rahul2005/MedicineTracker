# Medicine Tracker Coding Test
Technology stack used :
* .net CORE 3.1 
* Angular 8 with .net Core(3.1) template
* .net CORE API
* EF CORE
* MS SQL Server

Solution Components :
*  UI Components - Angular 8 on .Net CORE Template - This Components is developed to handled UI Logic 
*  Backend API -  Web API  on .Net CORE Template - This components is developed to handle business logic and data repo.
*  API Unit Test - Test Cases using NUnit with Moq/AutoMoq.

In Visual Studio 2019, Open Project:

1. Remove the contents of the folder Migrations.
2. Then open the Package Manager Console (Tools->Nuget Package Manager->Package Manager Console).
3. Run the following commands:
	- add-migration InitialMigration --namespace Your.Namespace  - for EF Core
	- database update -- To run Migration Script

4. MedTrack/MedicineTracker.API/MedicineTracker.API.csproj ->
	
	- (localdb)\\mssqllocaldb - Local DB Instance
	- Data Seed will be added while running API
	- Build and Run Project on IIS Express
	- Healthcheck Url : https://localhost:44303/api/healthcheck
	- API Documentation Swagger Url : https://localhost:44303/swagger/index.html
	
5. MedTrack/MedicineTracker.API.UnitTests
	- To Run Test caes for Medicine controller.
	
6. MedTrack/MedicineTracker/ClientApp
	- Run npm Install to  add nom packages for Angular 8 application.
	- Check ApiUrl in Configuration to use https://localhost:44303.
	- Build and Run Project on IIS Express
	- Healthcheck Url : https://localhost:44331/api/healthcheck
	- Application Home Url : https://localhost:44331
	
7. Code Test Functionalty available on : https://localhost:44331/medicines

	

	

	
