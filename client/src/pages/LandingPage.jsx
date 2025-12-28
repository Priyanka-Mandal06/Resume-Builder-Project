import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../api";

import { updateEducation } from "../redux/educationSlice";
import { updateProfile } from "../redux/profileSlice";
import { updateProject } from "../redux/projectSlice";
import { updateExperience } from "../redux/experienceSlice";
import {
  updateAchievements,
  updateExtraCoCurricular,
  updateSkills,
} from "../redux/extraDetailsSlice";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff6f61" },
  },
});

export default function LandingPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllResumeData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`,
        { headers: { authorization: currentUser.token } }
      );

      const resumeData = response.data.resumeData[0];
      if (!resumeData) return;

      dispatch(updateProfile(resumeData.profile));
      dispatch(updateEducation(resumeData.education[0]));

      resumeData.projects.forEach((project, index) => {
        Object.keys(project).forEach((field) => {
          dispatch(updateProject({ index, field, value: project[field] }));
        });
      });

      resumeData.experience.forEach((experience, index) => {
        Object.keys(experience).forEach((field) => {
          dispatch(
            updateExperience({ index, field, value: experience[field] })
          );
        });
      });

      const { skills, achievements, extraCoCurricular } =
        resumeData.extraDetails;

      Object.keys(skills).forEach((type) => {
        skills[type].forEach((skill, index) => {
          dispatch(updateSkills({ type, index, value: skill }));
        });
      });

      achievements.forEach((item, index) => {
        dispatch(updateAchievements({ index, value: item }));
      });

      extraCoCurricular.forEach((item, index) => {
        dispatch(updateExtraCoCurricular({ index, value: item }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) getAllResumeData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box className="bg">
        <Container maxWidth="md" className="bg-content">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" fontWeight={800}>
              BUILD YOUR FUTURE
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
              Create professional resumes effortlessly.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              onClick={() => navigate("/profile")}
              className="bg-btn"
              size="large"
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
