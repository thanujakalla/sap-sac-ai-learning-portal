import json
import unittest
from unittest.mock import Mock, patch

from ai_tutor import main


class AiTutorFunctionTest(unittest.TestCase):
    def _request(self, body=None, method="POST", origin="https://thanujakalla.github.io"):
        request = Mock()
        request.method = method
        request.headers = {"origin": origin}
        request.get_json.return_value = body
        return request

    @patch("ai_tutor.generate_answer", return_value="A grounded answer")
    @patch("ai_tutor.search_documents", return_value="Documentation")
    def test_returns_normalized_contract(self, search_mock, answer_mock):
        response = main(
            self._request(
                {
                    "question": "What is a story?",
                    "history": [],
                    "context": {"day": 1},
                }
            )
        )
        payload = json.loads(response.get_body())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["answer"], "A grounded answer")
        self.assertEqual(payload["citations"], [])
        self.assertTrue(payload["requestId"])
        search_mock.assert_called_once_with("What is a story?")
        answer_mock.assert_called_once()

    def test_rejects_missing_question(self):
        response = main(self._request({}))
        payload = json.loads(response.get_body())

        self.assertEqual(response.status_code, 400)
        self.assertEqual(payload["error"], "question_required")

    def test_handles_preflight(self):
        response = main(self._request(method="OPTIONS"))
        self.assertEqual(response.status_code, 204)

    @patch("ai_tutor.search_documents", side_effect=RuntimeError("private detail"))
    def test_hides_internal_errors(self, _search_mock):
        response = main(self._request({"question": "What is SAC?"}))
        payload = json.loads(response.get_body())

        self.assertEqual(response.status_code, 500)
        self.assertEqual(payload["error"], "ai_tutor_unavailable")
        self.assertNotIn("private detail", response.get_body().decode())


if __name__ == "__main__":
    unittest.main()
