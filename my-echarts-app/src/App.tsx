import { useState, useEffect } from "react";
import AgricultureTable from "./component/AgricultureTable";
import AverageChart from "./component/AverageChart";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  Switch,
  Group,
  Title,
  createTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "blue", // use a Mantine supported color name
  });

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme={isDark ? "dark" : "light"}
      // colorScheme={isDark ? "dark" : "light"}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: isDark ? "#1A1B1E" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
        }}
      >
        <Group justify="space-between" align="center">
          <Title order={2}>Manufac</Title>
          <Switch
            size="md"
            color="dark.4"
            checked={isDark}
            onChange={(event) => setIsDark(event.currentTarget.checked)}
            onLabel={
              <IconSun
                size={16}
                stroke={2.5}
                color="var(--mantine-color-yellow-4)"
              />
            }
            offLabel={
              <IconMoonStars
                size={16}
                stroke={2.5}
                color="var(--mantine-color-blue-6)"
              />
            }
          />
        </Group>

        <div style={{ marginTop: "40px", paddingInline:"20px" }}>
          <AgricultureTable />
          <AverageChart colorScheme={isDark ? "dark" : "light"} />
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
