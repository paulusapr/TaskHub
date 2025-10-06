import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/app.dart';

class StoreService {
  final FlutterSecureStorage _storage = const FlutterSecureStorage();
  final String _keyName = AppConfig.keyToken;

  Future<void> storeToken(String token) async {
    await _storage.write(key: _keyName, value: token);
  }

  Future<String?> getToken() async {
    return await _storage.read(key: _keyName);
  }

  Future<void> removeToken() async {
    await _storage.delete(key: _keyName);
  }
}
