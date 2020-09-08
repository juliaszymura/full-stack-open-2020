import notificationReducer, {
  showNotification,
  clearNotification,
} from "./notificationReducer";
import deepFreeze from "deep-freeze";

describe("Notification reducer", () => {
  test("Notification content can be added", () => {
    const state = "";
    const action = {
      type: "notification/shown",
      content: "Show this notification",
      id: 1337,
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState.content).toEqual(action.content);
    expect(newState.id).toEqual(action.id);
  });

  test("Notification can be cleared", () => {
    const state = { content: "Clear this notification", id: 1337 };
    const action = { type: "notification/cleared", id: 1337 };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState.content).toEqual("");
    expect(newState.id).toEqual(null);
  });
});

describe("Notification action creators", () => {
  const content = "Show notification";
  const id = 1337;
  test("showNotification generates correct action", () => {
    const action = showNotification(content, id);

    expect(action).toHaveProperty("type", "notification/shown");
    expect(action).toHaveProperty("content", content);
    expect(action).toHaveProperty("id", id);
  });

  test("clearNotification generates correct action", () => {
    const action = clearNotification(id);

    expect(action).toHaveProperty("type", "notification/cleared");
    expect(action).toHaveProperty("id", id);
  });
});
