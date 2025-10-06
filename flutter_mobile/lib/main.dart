import 'package:flutter/material.dart';
import 'pages/home.dart';
import 'pages/login.dart';
import 'pages/register.dart';
import 'pages/tasks/create.dart';
import 'pages/tasks/edit.dart';
import 'context.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TaskHub Flutter',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const ContextWrapper(),
      routes: {
        '/login': (context) => const LoginPage(),
        '/home': (context) => const MyHomePage(title: 'My Task'),
        '/register': (context) => const RegisterPage(),
        '/tasks/create': (context) => const CreateTaskPage(title: 'Create Task'),
        '/tasks/edit': (context) => const EditTaskPage(title: 'Edit Task'),
      },
    );
  }
}
