import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app.dart';
import 'store.dart';

class TaskService {
  static String baseUrl = AppConfig.baseUrl;

  static Future<Map<String, dynamic>> removeTask(int id) async {
    final store = StoreService();

    try {
      final String? tokenAccess = await store.getToken();

      final response = await http.delete(
        Uri.parse('$baseUrl/tasks/delete/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $tokenAccess'
        },
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      }
      throw Exception('Failed to retrieve data');
    } on Exception catch (e) {
      throw Exception('Something went wrong: $e');
    }
  }

  static Future<Map<String, dynamic>> getAllTasks() async {
    final store = StoreService();

    try {
      final String? tokenAccess = await store.getToken();

      final response = await http.get(
        Uri.parse('$baseUrl/tasks/all'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $tokenAccess'
        },
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      }
      throw Exception('Failed to retrieve data');
    } on Exception catch (e) {
      throw Exception('Something went wrong: $e');
    }
  }

  static Future<Map<String, dynamic>> createTask(String title) async {
    final store = StoreService();

    try {
      final String? tokenAccess = await store.getToken();

      final response = await http.post(
        Uri.parse('$baseUrl/tasks/create'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $tokenAccess',
        },
        body: jsonEncode({'title': title}),
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      }
      throw Exception('Failed to retrieve data');
    } on Exception catch (e) {
      throw Exception('Something went wrong: $e');
    }
  }

  static Future<Map<String, dynamic>> getTask(int id) async {
    final store = StoreService();

    try {
      final String? tokenAccess = await store.getToken();

      final response = await http.get(
        Uri.parse('$baseUrl/tasks/single/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $tokenAccess',
        },
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      }
      throw Exception('Failed to retrieve data');
    } on Exception catch (e) {
      throw Exception('Something went wrong: $e');
    }
  }

  static Future<Map<String, dynamic>> updateTask(int id, String title, String status) async {
    final store = StoreService();

    try {
      final String? tokenAccess = await store.getToken();

      final response = await http.put(
        Uri.parse('$baseUrl/tasks/update/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $tokenAccess',
        },
        body: jsonEncode({'title': title, 'status': status}),
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      }
      throw Exception('Failed to retrieve data');
    } on Exception catch (e) {
      throw Exception('Something went wrong: $e');
    }
  }
}
