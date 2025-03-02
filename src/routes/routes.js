const { Router } = require("express")
const absenceService = require("../service/absence.js")
const attendanceservice = require( "../service/attendance.js");
const reportservice= require("../service/report.js")


const router = Router()

//absences
router.post("/report-absences",absenceService.serviceInsertAbsences);
router.get("/get-Absences",absenceService.serviceGetAbsence);
router.delete("/delete-absence", absenceService.serviceDeleteAbsences);
router.put("/update-absence", absenceService.serviceUpdateAbsence);


//attendance
router.post("/insertattendance",attendanceservice.serviceInsertAttendance);
router.get("/get-attendances",attendanceservice.serviceGetAttendence);

//reports
router.get("/get-reports",reportservice.serviceGetReports);

module.exports = router;