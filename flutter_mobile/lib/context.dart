import 'package:flutter/material.dart';
import 'services/store.dart';
import 'pages/home.dart';
import 'pages/login.dart';

class ContextWrapper extends StatelessWidget {
  const ContextWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final store = StoreService();

    return FutureBuilder<String?>(
      future: store.getToken(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final token = snapshot.data;
        if (token != null && token.isNotEmpty) {
          return const MyHomePage(title: 'My Task');
        } else {
          return const LoginPage();
        }
      },
    );
  }
}
