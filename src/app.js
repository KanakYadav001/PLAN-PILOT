const express = require("express");

const authRouter = require("./routers/auth.router");
const organizationRouter = require("./routers/organization.router");
const teamRouter = require("./routers/team.route");
const issueRouter = require("./routers/issue.route");
const memberRouter = require("./routers/member.router");
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/organizations", organizationRouter);
app.use("/teams", teamRouter);
app.use("/issues", issueRouter);
app.use("/members", memberRouter);

module.exports = app;
